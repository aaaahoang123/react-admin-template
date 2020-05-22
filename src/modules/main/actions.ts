import {createAction} from "../../utils/redux/create-action";
import {LoginFormData} from "./Login/form-data";

export const mainLogin = createAction<LoginFormData>('login@main');
export const loginComplete = createAction('login_complete@main');
