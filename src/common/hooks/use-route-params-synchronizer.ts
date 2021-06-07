import { useParams } from 'react-router-dom';
import {ActionCreator} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

/**
 * Sync the params from url (url/:id) with an redux action
 * When the params change, auto dispatch the action.
 *
 * @param changeAction
 * @param paramName
 */
function useRouteParamsSynchronizer(changeAction: ActionCreator<PayloadAction<number|string|undefined>>, paramName: string = 'id') {
    const params: any = useParams();
    const param: string = useMemo(() => params[paramName], [params, paramName]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeAction(param));
    }, [param, dispatch, changeAction]);

    return param;
}

export default useRouteParamsSynchronizer;
