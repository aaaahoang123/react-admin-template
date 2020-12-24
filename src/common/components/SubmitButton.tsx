import React, { memo, ReactNode } from 'react';
import AppState from '../../App.state';
import {useSelector} from 'react-redux';
import {Button, Form} from 'antd';
import {SaveOutlined} from '@ant-design/icons';
import {ButtonType} from 'antd/es/button/button';

interface SubmitButtonProps {
    title?: string;
    icon?: ReactNode;
    loadingSelector?: (state: AppState) => boolean;
    type?: ButtonType;
    className?: string;
    noStyle?: boolean;
}

const SubmitButton = memo(({title, icon, loadingSelector, type, className, noStyle}: SubmitButtonProps) => {
    const loading = useSelector(loadingSelector ?? (() => false));

    return (
        <Form.Item noStyle={noStyle}>
            <Button type={type ?? 'primary'}
                    htmlType="submit"
                    loading={loading}
                    icon={icon ?? <SaveOutlined />}
                    className={(className ?? '') + ' mt-2'}
            >
                {title ?? 'Lưu'}
            </Button>
        </Form.Item>
    );
});

export default SubmitButton;
