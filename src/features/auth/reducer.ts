import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AuthState, {LoginFormData} from './state';
import {User} from '../../models/user';
import {decodeToken} from 'react-jwt';
import {JwtPayload} from '../../common/models/jwt-payload';
import {PreparedCaseReducer} from '../../common/utils';

const slice = createSlice({
    name: 'auth',
    initialState: {...new AuthState()},
    reducers: {
        authUserLoaded(state, {payload}: PayloadAction<User>) {
            state.user = payload;
            state.loginFormLoading = false;
        },
        authLogin(state, {payload}: PayloadAction<LoginFormData>) {
            state.loginFormLoading = true;
        },
        authTokenChanged: new PreparedCaseReducer<AuthState, string, boolean>((state, {payload, meta: forceUpdate}: PayloadAction<string, string, boolean|undefined>) => {
            if (!state.tokenInfo || forceUpdate) {
                const tokenInfo = decodeToken(payload || '') as JwtPayload;
                state.tokenInfo = tokenInfo;
                state.authenticated = (new Date().valueOf() / 1000) < (tokenInfo?.exp || 0);
            }
        }),
        authLoginComplete(state: AuthState, action: PayloadAction<boolean>) {
            state.loginFormLoading = false;
        },
    }
});

export const {authTokenChanged, authUserLoaded, authLogin, authLoginComplete} = slice.actions;

export const authLoadUserData = createAction('auth/loadUserData');

const authReducer = slice.reducer;

export default authReducer;
