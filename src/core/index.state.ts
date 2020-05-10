import {AppState} from '../App.state';
import {MainState} from '../modules/main/state';
import {RouterState} from 'connected-react-router';
import {History} from 'history';

export interface IndexState {
    app: AppState;
    main: MainState;
    router: RouterState<History.PoorMansUnknown>;
}
