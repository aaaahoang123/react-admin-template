import {Route} from 'react-router';
import React from "react";
import IndexRouter from '../core/index.router';
import {Routes} from '../entities/common/route';
import PrivateRoute from '../common/components/PrivateRoute';

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
                        <R key={path} path={path}>
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
