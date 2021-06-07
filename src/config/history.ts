import { createBrowserHistory } from 'history';
import {APP_PREFIX} from './properties';

const history = createBrowserHistory({
    basename: APP_PREFIX
});

export default history;
