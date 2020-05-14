import {AppState} from '../App.state';
import {MainState} from '../modules/main/state';
import {RouterState} from 'connected-react-router';
import {History} from 'history';
import {RouterState as AppRouterState} from './routes.reducer';
import {VehicleCategoryState} from '../modules/vehicle-category/state';

export interface IndexState {
    app: AppState;
    main: MainState;
    vehicleCategory: VehicleCategoryState;
    router: RouterState<History.PoorMansUnknown>;
    routes: AppRouterState;
}
