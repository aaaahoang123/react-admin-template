import {User} from './entities/api/user';
import {createAction} from "./utils/redux/create-action";

export const triggerSidebar = createAction('sidebar_collapse@app');
export const changeWindowSize = createAction<{width: number, height: number}>('change_window_size@app');
export const appUserChange = createAction<User>('user_changed@app');
