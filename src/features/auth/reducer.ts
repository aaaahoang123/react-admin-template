import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AuthState, {LoginFormData} from './state';
import {User} from '../../models/user';
import {decode} from 'jsonwebtoken';
import {JwtPayload} from '../../common/models/jwt-payload';

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
        authTokenChanged(state, action: PayloadAction<string>) {
            const tokenInfo = decode(action.payload || '') as JwtPayload;
            state.tokenInfo = tokenInfo;
            state.authenticated = (new Date().valueOf() / 1000) < (tokenInfo?.exp || 0);
        },
        authLoginComplete(state: AuthState, action: PayloadAction<boolean>) {
            state.loginFormLoading = false;
        }

    }
});

export const {authTokenChanged, authUserLoaded, authLogin, authLoginComplete} = slice.actions;
export const authLoadUserData = createAction('auth/authLoadUserData');

const authReducer = slice.reducer;

export default authReducer;
