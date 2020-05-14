import {Route} from 'react-router';
import React from "react";
import {Routes} from '../entities/common/route';
import PrivateRoute from '../common/components/PrivateRoute';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';

const Render = ({routes, parentPath = ''}: { routes?: Routes, parentPath?: string }) => {
    return (
        <>
            {
                routes?.map(route => {
                    const R = route.protected
                        ? PrivateRoute
                        : Route;

                    const children = route.children
                        ? <Render routes={route.children} parentPath={route.path}/>
                        : null;

                    const content = route.component
                        ? <route.component/>
                        : null;

                    const path = parentPath + route.path;

                    return (
                        <R key={path} path={path} route={route} isActive={route.isActive}>
                            {
                                content
                            }
                            {
                                children
                            }
                        </R>
                    );
                })
            }
        </>
    );
}

function RouterOutlet({routes}: {routes?: Routes}) {
    return (
        <>
            {
                <Render routes={routes}/>
            }
        </>
    );
}

const mapStateToProps = ({routes}: IndexState) => ({
    routes: routes.routes
});

const connected = connect(mapStateToProps, null)(RouterOutlet);

export default connected;
