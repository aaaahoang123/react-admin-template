
import {ActionCreator} from 'redux';
import {useDispatch} from 'react-redux';
import useDeepEffect from './use-deep-effect';
import { useLayoutEffect } from 'react';
import { Form } from 'antd';
import {PayloadAction} from '@reduxjs/toolkit';

/**
 * Use a form that sync to an store data
 * When store data change, update the form data.
 * When the component destroy, sync the form data to store.
 *
 * @param formData
 * @param setFormData
 */
function useConnectedForm<T>(formData: T, setFormData: ActionCreator<PayloadAction<T>>) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useDeepEffect(() => {
        form.setFieldsValue(formData as any);
    }, [formData, form]);

    useLayoutEffect(() => {
        return function cleanup() {
            dispatch(setFormData?.(form.getFieldsValue()));
        };
    }, [setFormData, form, dispatch]);

    return form;
}

export default useConnectedForm;
