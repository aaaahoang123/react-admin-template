// import {useEffect} from 'react';
import {FormInstance} from 'antd/lib/form';
import useDeepEffect from './use-deep-effect';
import {useEffect} from 'react';
import {ActionCreator} from 'redux';

export interface FormConnectStoreParams<T = any> {
    form: FormInstance;
    formData: T;
    formDataChange: ActionCreator<T>;
}

function FormConnectStore({form, formData, formDataChange}: FormConnectStoreParams) {
    useDeepEffect(() => {
        form.setFieldsValue(formData as any);
    }, [formData, form]);

    useEffect(() => {
        return function cleanUp() {
            formDataChange?.(form.getFieldsValue());
        };
    }, [formDataChange, form]);
}

export default FormConnectStore;
