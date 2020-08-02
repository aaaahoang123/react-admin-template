import rootRoutes from './routes';
import {LOCATION_CHANGE} from 'connected-react-router';
import {Route} from '../entities/common/route';
import {Route as BreadCrumbRoute} from 'antd/lib/breadcrumb/Breadcrumb';
import {matchPath} from 'react-router';
import IdMapper from '../entities/common/id-mapper';
import { appTokenChange } from '../App.reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {decode} from 'jsonwebtoken';
import {JwtPayload} from '../entities/common/jwt-payload';

export class RouterState {
    routes: IdMapper<Route> = {};
    activatedRoutes: string[] = [];
    rootRoutes: string[] = [];
    childrenMapper: IdMapper<string[]> = {};
    breadcrumb: BreadCrumbRoute[] = [];

    constructor() {
        rootRoutes.forEach(route => {
            this.rootRoutes.push(route.path);
            this?.addRoute?.(route);
        });
    }

    addRoute?(route: Route, parentPath = '') {
        const path = parentPath + route.path;
        this.routes[path] = {
            ...route,
            accessible: true
        };
        if (route.children?.length) {
            this.childrenMapper[path] = route.children.map(child => this.addRoute?.(child, path)) as any;
        }
        return path;
    }
}

const slice = createSlice({
    name: 'routes',
    initialState: {...new RouterState()},
    reducers: {},
    extraReducers: {
        [LOCATION_CHANGE]: function reduceRoutesByPathname(state: RouterState, {payload}: PayloadAction<any>): RouterState {
            const pathname = payload?.location?.pathname;
            const activatedRoutesSet = new Set<string>();
            const checkActive = (route: string) => {
                if (route === '*') {
                    return false;
                }
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

            const breadcrumb: BreadCrumbRoute[] = [...activatedRoutes].reverse().map(path => {
                return {
                    path: path,
                    breadcrumbName: state.routes[path]?.data?.title || '',
                };
            });
            return {
                ...state,
                activatedRoutes,
                breadcrumb
            } as RouterState;
        },

        [appTokenChange.type]: (state, {payload}: PayloadAction<string>) => {
            const info = decode(payload || '') as JwtPayload;
            state.rootRoutes.forEach(path => checkAccessibleByPath(state, path, info));
        }
    }
});

function checkAccessibleByPath(state: RouterState, path: string, info: JwtPayload) {
    const route = state.routes[path];
    state.routes[path].accessible = !!info?.is_admin || !route.data?.role || info?.roles?.includes(route.data.role)

    if (state.childrenMapper[path]) {
        for (const child of state.childrenMapper[path]) {
            checkAccessibleByPath(state, child, info);
        }
    }
}

const routesReducer = slice.reducer;

export default routesReducer;
