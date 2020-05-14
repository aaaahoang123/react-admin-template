import IndexRouter from './index.router';
import {ActionPayload} from '../entities/common/action-payload';
import {LOCATION_CHANGE} from 'connected-react-router';
import {Route} from '../entities/common/route';
import {matchPath} from 'react-router';

export class RouterState {
    routes = IndexRouter;
    activatedRoutes: Route[] = [];
}

function routesReducer(state = new RouterState(), action: ActionPayload) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return reduceRoutesByPathname(state, action.payload.location.pathname);
        default:
            return state;
    }
}

function reduceRoutesByPathname(state: RouterState, pathname: string): RouterState {
    state.activatedRoutes.forEach(route => route.isActive = false);
    state.activatedRoutes = [];
    const checkActiveOfRoute = (route: Route, pathname: string, prefix = ''): Route => {
        const pathToCheck = prefix + route.path;
        const testPath = matchPath(pathname, pathToCheck);
        if (testPath) {
            route.isActive = !!testPath?.isExact
            if (route.isActive) {
                state.activatedRoutes.push(route);
            }
            if (route.children) {
                route.children = route.children.map(child => {
                    const newChild = checkActiveOfRoute(child, pathname, pathToCheck);
                    if (newChild.isActive) {
                        route.isActive = true;
                        state.activatedRoutes.push(route);
                    }
                    return newChild;
                });
            }
        }
        return route;
    }

    state.routes = state.routes.map((route) => checkActiveOfRoute(route, pathname));
    return state;
}

export default routesReducer;
