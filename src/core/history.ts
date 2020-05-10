import { createBrowserHistory } from 'history';
import {APP_PREFIX} from './properties';

export const history = createBrowserHistory({
    basename: APP_PREFIX
});
