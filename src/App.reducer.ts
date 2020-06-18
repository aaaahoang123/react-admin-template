import {AppState} from './App.state';
import {ActionPayload} from './entities/common/action-payload';
import {createSlice} from '@reduxjs/toolkit';
import {User} from './entities/api/user';

const slice = createSlice({
    initialState: new AppState(),
    name: 'app',
    reducers: {
        triggerSidebar(state) {
            state.sidebarCollapse = !state.sidebarCollapse;
        },
        changeWindowSize(state, action: ActionPayload<{width: number, height: number}>) {
            Object.assign(state, {
                windowWidth: action.payload.width,
                windowHeight: action.payload.height,
                isMobile: action.payload.width < 768,
            });
        },
        appUserChange(state, {payload}: ActionPayload<User | undefined>) {
            state.user = payload as any;
            state.authenticated = !!payload;
        }
    }
});

export const { appUserChange, triggerSidebar, changeWindowSize } = slice.actions;
const appReducer = slice.reducer;

export default appReducer;
