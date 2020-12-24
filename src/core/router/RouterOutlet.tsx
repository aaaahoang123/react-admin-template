import React, {useMemo, Suspense} from 'react';
import {RouteConfig, WithRoutesComponentProps} from './declare';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Skeleton} from 'antd';

export interface ProtectedRouteParams {
    route: RouteConfig;
}

function ProtectedContent({route, ...props}: ProtectedRouteParams) {
    const canActivate = useMemo(() => route.canActivate?.(route) ?? true, [route]);
    if (!canActivate) {
        return <div>Can not access this route</div>;
    }
    const result = [];
    if (route.redirectTo) {
        return <Redirect to={route.redirectTo}/>;
    }
    if (route.component) {
        result.push(
            <Suspense fallback={<Skeleton/>} key={0}>
                <route.component {...props}
                    // @ts-ignore
                                 routes={route.children} />
            </Suspense>
        );
    } else if (route.children?.length) {
        result.push(
            <RouterOutlet key={1} routes={route.children} />
        );
    }
    return <>{result}</>;
}

function RouterOutlet({routes}: WithRoutesComponentProps) {

    return <Switch>
        {
            routes.map(route => (
                <Route path={route.path}
                       exact={route.exact}
                       key={route.path}
                       render={props => <ProtectedContent route={route} {...props} />}/>
            ))
        }
    </Switch>;
}

export default RouterOutlet;
