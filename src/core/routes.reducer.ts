import IndexRouter from './index.router';
import {ActionPayload} from '../entities/common/action-payload';
import {LOCATION_CHANGE} from 'connected-react-router';
import {Route, Routes} from '../entities/common/route';


function routesReducer(routes = IndexRouter, action: ActionPayload) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return reduceRoutesByPathname(routes, action.payload?.location?.pathname);
        default:
            return routes;
    }
}

function reduceRoutesByPathname(routes: Routes, pathname: string): Routes {
    if (!pathname) {
        return routes;
    }
    return routes.map(route => checkActiveOfRoute(route, pathname));
}

function checkActiveOfRoute(route: Route, pathname: string, prefix = ''): Route {
    const pathToCheck = prefix + route.path;
    route.isActive =  pathToCheck === pathname;
    if (route.children) {
        route.children = route.children.map(child => {
            const newChild = checkActiveOfRoute(child, pathname, pathToCheck);
            if (newChild.isActive) {
                route.isActive = true;
            }
            return newChild;
        });
    }
    return route;
}

export default routesReducer;
