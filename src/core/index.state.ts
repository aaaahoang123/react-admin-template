import {AppState} from '../App.state';
import {MainState} from '../modules/main/state';
import {RouterState} from 'connected-react-router';
import {History} from 'history';
import {Routes} from '../entities/common/route';

export interface IndexState {
    app: AppState;
    main: MainState;
    router: RouterState<History.PoorMansUnknown>;
    routes: Routes;
}
