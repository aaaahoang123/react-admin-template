import {Redirect, Route, Switch} from 'react-router';
import React from "react";
import {Route as RouteType} from '../entities/common/route';
import PrivateRoute from '../common/components/PrivateRoute';
import {IndexState} from '../core/index.state';
import {useSelector} from 'react-redux';

const Render = ({ path }: { path: string, route?: RouteType, childrenPath?: string[] }) => {
    const {route, childrenPath} = useSelector(({routes}: IndexState) => {
        return {
            route: routes.routes[path],
            childrenPath: routes.childrenMapper[path]
        };
    });

    if(route?.redirectTo) {
        return (
            <Redirect from={path} to={route.redirectTo} exact={true} />
        );
    }

    const R = route?.protected
        ? PrivateRoute
        : Route;

    const children =  childrenPath?.map(child => <Render key={child} path={child} />);

    const content = route?.component
        ? <route.component/>
        : null;

    return (
        <R path={path}>
            {content}
            {children}
        </R>
    );
}

function RouterOutlet() {
    const {routes} = useSelector(({routes}: IndexState) => ({
        routes: routes.rootRoutes
    }));

    return (
        <Switch>
            {
                routes?.map(route => (
                    <Render path={route} key={route} />
                ))
            }
        </Switch>
    );
}

export default RouterOutlet;
