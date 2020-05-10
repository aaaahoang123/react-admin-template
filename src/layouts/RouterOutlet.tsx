import {Route} from 'react-router';
import React from "react";
import IndexRouter from '../core/index.router';
import {Routes} from '../entities/common/route';
import PrivateRoute from '../common/components/PrivateRoute';

const Render = ({routes, parentPath}: { routes?: Routes, parentPath?: string }) => {
    return (
        <>
            {
                routes?.map(route => {
                    const R = route.protected
                        ? PrivateRoute
                        : Route;
                    return (
                        <R key={parentPath || '' + route.path} path={route.path}>
                            {
                                route.component
                                    ? <route.component/>
                                    : null
                            }
                            {
                                route.children
                                    ? <Render routes={route.children} parentPath={route.path}/>
                                    : null
                            }
                        </R>
                    );
                })
            }
        </>
    );
}

function RouterOutlet() {
    return (
        <>
            {
                <Render routes={IndexRouter}/>
            }
        </>
    );
}

export default RouterOutlet;
