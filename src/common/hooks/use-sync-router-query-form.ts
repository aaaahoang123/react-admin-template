import {Form} from 'antd';
import {ActionCreatorWithPreparedPayload} from '@reduxjs/toolkit';
import useQuery from './use-query';
import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {filterParams} from '../utils';
import {FormInstance} from 'antd/lib/form/hooks/useForm';
import {FilterTransformStrategy} from '../utils/filter-params';

export interface UseSyncRouterQueryFormExtraOptions {
    transformRouterQuery?: (_: any) => any;
}

function useSyncRouterQueryForm<P>(
    initialParams: P,
    paramsChangeAction: ActionCreatorWithPreparedPayload<[any, any], P|Partial<P>>,
    ignoreSyncFields: string[] = [],
    extraOptions?: UseSyncRouterQueryFormExtraOptions
): [FormInstance<P>, (changes: any|undefined) => void] {
    const [form] = Form.useForm<P>();
    const query = useQuery();
    const dispatch = useDispatch();

    const onFormChange = useCallback((changes?: any) => {
        if (!Object.keys(changes ?? {}).find(key => ignoreSyncFields.includes(key))) {
            dispatch(paramsChangeAction({...form.getFieldsValue(), page: 1}, true));
        }
    }, [dispatch, paramsChangeAction, form, ignoreSyncFields])

    useEffect(() => {
        const dispatchingValue: P = Object.keys(query ?? {})?.length ? query : null;
        const resolvedDispatchingValue = extraOptions?.transformRouterQuery?.(dispatchingValue) ?? dispatchingValue;
        dispatch(paramsChangeAction(resolvedDispatchingValue, false));
        const formData = {...initialParams, ...filterParams(resolvedDispatchingValue || {}, FilterTransformStrategy.NON_TRANSFORM)};
        form.setFieldsValue(formData);
        // eslint-disable-next-line
    }, []);

    return [form, onFormChange];
}

export default useSyncRouterQueryForm;
