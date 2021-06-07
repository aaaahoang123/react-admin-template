import AppState from '../../App.state';
import {createSelector} from '@reduxjs/toolkit';

const selectAuthState = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
    selectAuthState,
    state => state.user
);

export const selectAuthenticated = createSelector(
    selectAuthState,
    state => state.authenticated
);
