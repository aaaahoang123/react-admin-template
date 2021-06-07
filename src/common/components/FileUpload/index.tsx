import React, {PureComponent} from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {RcFile, UploadChangeParam, UploadFile, UploadProps} from 'antd/lib/upload/interface';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import {API_URL, AUTH_STORAGE_KEY, DOMAIN} from '../../../config/properties';

// @ts-ignore
export interface FileUploadProps<ResponseType extends any = any> extends UploadProps {
    value?: string|string[];
    pathToUrl?: (path: string) => string;
    pathFromResponse?: string | ((response: ResponseType) => string);
    valueMode?: 'multiple' | 'single';
    onChange?: (_: string|string[]) => void;
    maxSize?: number;
    compressRatio?: number;
    maxImageWidth?: number;
    folder?: string;
}

interface FileUploadState<ResponseType extends any = any> {
    previewVisible: boolean,
    previewImage?: string|ArrayBuffer,
    previewTitle?: string,
    fileList: UploadFile<ResponseType>[];
    value?: string|string[];
}

function getBase64(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

const compressImage = (file: File, ratio: number, maxWidth: number, callback: (result: Blob) => void): void => {
    getBase64(file as any)
        .then((base64) => {
            const canvas = document.createElement('canvas');
            const img = document.createElement('img');
            img.src = base64 as string;
            img.onload = () => {
                const newWidth = img.width > maxWidth ? maxWidth : img.width;
                const newHeight = img.height * (newWidth / img.width);
                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, newWidth, newHeight);
                // ctx.fillStyle = 'red';
                // ctx.textBaseline = 'middle';
                // ctx.fillText('Ant Design', 20, 20);
                const trueRatio = ratio > 1
                    ? 1
                    : ratio < 0
                        ? 0.8
                        : ratio;
                canvas.toBlob(blob => callback(blob as any), 'image/jpeg', trueRatio);
            };
        });
};

const UploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const defaultPathToUrl = (path: string) => `${DOMAIN}/upload/images/${path}`;
const defaultPathFromResponse = (response: any) => response.data?.path;

const commonHeaders = {
    Authorization: `Bearer ${localStorage.getItem(AUTH_STORAGE_KEY) ?? ''}`,
    Accept: 'application/json'
};

class FileUpload<ResponseType extends object = any> extends PureComponent<FileUploadProps<ResponseType>, FileUploadState<ResponseType>> {
    state = {
        value: [],
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    static getDerivedStateFromProps(nextProps: FileUploadProps, prevState: FileUploadState) {
        const value = nextProps.value;
        const resolvedPaths = isString(value) ? [value] : (value ?? undefined);
        if (!isEqual(resolvedPaths, prevState.value)) {
            const { pathToUrl } = nextProps;
            return {
                value: resolvedPaths,
                fileList: resolvedPaths?.map((path, index) => ({
                    uid: 0 - index as any,
                    name: path,
                    status: 'done',
                    url: (pathToUrl ?? defaultPathToUrl)(path),
                } as any)) ?? []
            };
        }
        return {};
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file: UploadFile<ResponseType>) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj!) as any;
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name,
        });
    };

    handleChange = ({ fileList, file }: UploadChangeParam<UploadFile<ResponseType>>) => {
        const {valueMode, onChange} = this.props;
        if (file.status === 'done') {
            const newValue = [
                ...(this.state.value ?? []),
                this.retrieveImageFromResponseInternal(file.response!)
            ];

            this.setState({
                fileList,
                value: newValue
            });
            if (valueMode === 'multiple') {
                onChange?.(newValue);
            } else {
                onChange?.(newValue[newValue.length - 1]);
            }
        } else if (file.status === 'removed') {
            const newValue = fileList.filter(item => file !== item)
                .map(file => file.response ? this.retrieveImageFromResponseInternal(file.response) : file.name);

            this.setState({
                fileList,
                value: newValue
            });
            if (valueMode === 'multiple') {
                onChange?.(newValue);
            } else {
                onChange?.(null as any);
            }
        } else {
            this.setState({
                fileList
            });
        }
    };

    simpleTransformFile = async (file: RcFile): Promise<Blob|File|void>=> {
        const {compressRatio, maxImageWidth} = this.props;
        const trueRatio = (compressRatio && compressRatio < 1 && compressRatio > 0) ? compressRatio : 1;
        const trueMaxImageWidth = (maxImageWidth && maxImageWidth < Infinity && maxImageWidth > 0) ? maxImageWidth : Infinity;

        if (trueRatio < 1 || trueMaxImageWidth < Infinity) {
            return new Promise<Blob>((resolve) =>
                compressImage(file, trueRatio, trueMaxImageWidth, (result) => resolve(result))
            );
        }

        return file;
    };

    private retrieveImageFromResponseInternal(response: ResponseType): string {
        const { pathFromResponse } = this.props;
        return isFunction(pathFromResponse)
            ? pathFromResponse(response)
            : isString(pathFromResponse)
                ? get(response, pathFromResponse)
                : defaultPathFromResponse(response);
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle, value } = this.state;
        const {action, listType, maxSize, valueMode, onChange, beforeUpload, headers, data, folder, ...props} = this.props;
        const realData = folder
            ? {...data ?? {}, folder}
            : data

        return (
            <>
                <Upload
                    action={action ?? `${DOMAIN}/${API_URL}/storage/upload`}
                    listType={listType ?? 'picture-card'}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={beforeUpload ?? this.simpleTransformFile}
                    headers={headers ?? commonHeaders}
                    data={realData}
                    {...props}
                >
                    {
                        (valueMode === 'single' && (value?.length ?? 0) < 1)
                        || (valueMode !== 'single' && (!maxSize || !value?.length || (value?.length < maxSize)))
                            ? UploadButton : null
                    }
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                    className="large-modal"
                >
                    <img alt={previewTitle} src={previewImage} className="w-100" />
                </Modal>
            </>
        );
    }
}

export default FileUpload;
