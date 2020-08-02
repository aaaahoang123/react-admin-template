import React from "react";
import { Route, Redirect } from "react-router-dom";
import {RootState} from '../../core/state';
import {shallowEqual, useSelector} from 'react-redux';

interface PrivateRouteProps {
    path: string;
}

function PrivateRoute({ children, path, ...rest }: PrivateRouteProps & any): any {
    const {authenticated} = useSelector(({app}: RootState) => ({
        authenticated: app.authenticated,
    }), shallowEqual);
    return (
        <Route {...rest} path={path}
               render={({ location }) =>
                   authenticated ? (
                       children
                   ) : (
                       // <div>Loading component</div>
                       <Redirect
                           to={{
                               pathname: "/login",
                               state: { from: location }
                           }}
                       />
                   )
               }
        >
        </Route>
    );
}

export default PrivateRoute;
