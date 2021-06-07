import React, {forwardRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import storageService from '../../service/storage-service';
import {InputProps} from 'antd/lib/input/Input';
import {RICH_EDITOR_API_KEY} from '../../../config/properties';
import {UploadFolder} from '../../enums/upload-folder';
import {Rest} from '../../models/rest';

const handleUpload = (blobInfo: any, success: any, failure: any) => {
    storageService.uploadFile(blobInfo.blob(), UploadFolder.articles)
        .then((res: Rest<any>) => {
            success(`${res?.data?.url}`);
        })
        .catch(e => failure('Tải ảnh lên thất bại'));
};

const richEditorConfig = {
    height: 500,
    menubar: true,
    plugins: 'print preview fullpage searchreplace ' +
        'directionality fullscreen image ' +
        'link media template codesample table charmap hr pagebreak nonbreaking anchor ' +
        'toc insertdatetime lists paste',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | ' +
        'link | alignleft aligncenter alignright alignjustify  | ' +
        'numlist bullist outdent indent  | removeformat',
    automatic_uploads: true,
    images_upload_handler: handleUpload,
    template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
    image_caption: true,
    spellchecker_dialog: true,
    spellchecker_whitelist: ['Ephox', 'Moxiecode']
};

const RichEditor = forwardRef(({onChange, value, ...props}: InputProps, ref: any) => {
    const handleChange = (content: string, editor: any) => {
        onChange?.(content as any);
    };

    return (
        <Editor
            apiKey={RICH_EDITOR_API_KEY}
            initialValue={value}
            init={richEditorConfig}
            onEditorChange={handleChange}
            ref={ ref }
            {...props as any}
        />
    );
});

export default RichEditor;
