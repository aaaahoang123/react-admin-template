import IndexRouter from './index.router';
import {ActionPayload} from '../entities/common/action-payload';
import {LOCATION_CHANGE} from 'connected-react-router';
import {Route} from '../entities/common/route';
import {matchPath} from 'react-router';
import IdMapper from '../entities/common/id-mapper';

export class RouterState {
    routes: IdMapper<Route> = {};
    activatedRoutes: string[] = [];
    rootRoutes: string[] = [];
    childrenMapper: IdMapper<string[]> = {};

    constructor() {
        IndexRouter.forEach(route => {
            this.rootRoutes.push(route.path);
            this.addRoute(route);
        });
    }

    addRoute(route: Route, parentPath = '') {
        const path = parentPath + route.path;
        this.routes[path] = route;
        if (route.children?.length) {
            this.childrenMapper[path] = route.children.map(child => this.addRoute(child, path));
        }
        return path;
    }
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
    const activatedRoutesSet = new Set<string>();
    const checkActive = (route: string) => {
        const testPath = matchPath(pathname, route);
        if (testPath) {
            if (testPath?.isExact) {
                activatedRoutesSet.add(route);
                return true;
            }
            for (const child of state.childrenMapper[route] || []) {
                if (checkActive(child)) {
                    activatedRoutesSet.add(route);
                    return true;
                }
            }
        }
        return false;
    };
    state.rootRoutes.forEach(route => checkActive(route) ? activatedRoutesSet.add(route) : null);

    const activatedRoutes = Array.from(activatedRoutesSet);

    [...state.activatedRoutes, ...activatedRoutes].forEach(route => {
        state.routes[route] = {
            ...state.routes[route],
            isActive: activatedRoutes.includes(route)
        };
    });

    return {
        ...state,
        activatedRoutes
    } as RouterState;
}

export default routesReducer;
