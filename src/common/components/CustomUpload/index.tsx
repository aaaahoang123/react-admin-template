import {Modal, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {UploadProps} from 'antd/lib/upload';
import {UploadChangeParam, UploadFile} from 'antd/lib/upload/interface';
import {BASE_URL} from '../../../core/properties';
import {getAuthHeader} from '../../../utils/auth';

function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as any);
        reader.onerror = error => reject(error);
    });
}

function buildPreviewUrlByName(name: string): string {
    return `/images/upload/${name}`;
}

interface CustomUploadOwnProps {
    maxLength?: number;
    folder?: string;
    images?: string[];
    onChange?: (_: string[]) => void;
}

export declare type CustomUploadProps = CustomUploadOwnProps & UploadProps;

const uploadButton = (
    <div>
        <PlusOutlined/>
        <div className="ant-upload-text">Upload</div>
    </div>
);

const CustomUpload = ({maxLength, onChange, headers, action, folder, onPreview, images, ...props}: CustomUploadProps) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (images?.length) {
            setFileList(images.map((name, index) => ({
                uid: `${index}`,
                name,
                status: 'done',
                url: buildPreviewUrlByName(name)
            }) as UploadFile))
        }
    }, [images, setFileList]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as any);
        }

        setPreviewImage(file.url || file.preview || '');
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || '');
        onPreview?.(file);
    };

    const handleChange = ({fileList}: UploadChangeParam) => {
        setFileList(fileList);
        const value: string[] = fileList
            .filter((file) => file.url || file?.response?.status)
            .map((file) => file.url ? file.name : file.response?.data?.path);
        if (value.length) {
            onChange?.(value);
        }
    };

    const handleCancel = () => setPreviewVisible(false);
    const defaultHeaders = getAuthHeader(false);
    return (
        <div className="clearfix">
            <Upload
                action={action || `${BASE_URL}/storage`}
                headers={headers || defaultHeaders}
                data={folder ? {folder} : undefined}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                {...props}
            >
                {!maxLength || fileList.length <= maxLength ? uploadButton : null}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                width={700}
            >
                <img alt={previewTitle} className={'w-100'} src={previewImage}/>
            </Modal>
        </div>
    );
};

export default CustomUpload;
