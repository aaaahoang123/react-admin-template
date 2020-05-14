import {Route} from 'react-router';
import React from "react";
import {Route as RouteType} from '../entities/common/route';
import PrivateRoute from '../common/components/PrivateRoute';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';

const mapRoute = ({routes}: IndexState, {path}: { path: string }) => {
    return {
        route: routes.routes[path],
        childrenPath: routes.childrenMapper[path]
    };
};

const Render = ({path, route, childrenPath}: { path: string, route?: RouteType, childrenPath?: string[] }) => {
    const R = route?.protected
        ? PrivateRoute
        : Route;

    const children =  childrenPath?.map(child => <ConnectedRender key={child} path={child} />);

    const content = route?.component
        ? <route.component/>
        : null;

    return (
        <R path={path}>
            { content }
            { children }
        </R>
    );
}

const ConnectedRender = connect(mapRoute)(Render);

function RouterOutlet({routes}: {routes?: string[]}) {
    return (
        <>
            {
                routes?.map(route => (
                    <ConnectedRender path={route} key={route} />
                ))
            }
        </>
    );
}

const mapStateToProps = ({routes}: IndexState) => ({
    routes: routes.rootRoutes
});

const connected = connect(mapStateToProps, null)(RouterOutlet);

export default connected;
