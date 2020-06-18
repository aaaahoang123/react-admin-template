import {MainState} from './state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginFormData} from './Login/form-data';

// const mainReducer = createReducer(new MainState(), [
//     on(mainLogin, state => ({...state, requesting: true})),
//     on(loginComplete, state => ({...state, requesting: false}))
// ]);

const slice = createSlice({
    initialState: new MainState(),
    name: 'main',
    reducers: {
        mainLogin:(state, action: PayloadAction<LoginFormData>) => {
            return {
                ...state,
                requesting: true
            };
        },
        loginComplete(state) {
            return {
                ...state,
                requesting: false
            };
        }
    }
});

export const {mainLogin, loginComplete} = slice.actions;
const mainReducer = slice.reducer;

export default mainReducer;
