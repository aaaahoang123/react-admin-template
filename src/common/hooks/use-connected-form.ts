import useDeepEffect from './use-deep-effect';
import {useEffect} from 'react';
import {ActionCreator} from 'redux';
import {useDispatch} from 'react-redux';
import {Form} from 'antd';

export interface FormConnectStoreParams<T = any> {
    formData: T;
    setFormData: ActionCreator<T>;
}

function useConnectedForm({formData, setFormData}: FormConnectStoreParams) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useDeepEffect(() => {
        form.setFieldsValue(formData as any);
    }, [formData, form]);

    useEffect(() => {
        return () => {
            dispatch(setFormData?.(form.getFieldsValue()));
        };
    }, [setFormData, form, dispatch]);

    return form;
}

export default useConnectedForm;
