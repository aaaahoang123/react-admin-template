import React from "react";
import { Route } from "react-router-dom";
import {IndexState} from '../../core/index.state';
import {connect} from 'react-redux';
import {User} from '../../entities/api/user';
import {DOMAIN} from '../../core/properties';
import {fetchAuthData} from '../../App.actions';
import {Route as RouteType} from '../../entities/common/route';

interface PrivateRouteProps {
    user?: User;
    authenticated: boolean;
    fetchAuthData: typeof fetchAuthData;
    pathname: string;
    path: string;
    route: RouteType;
    isActive: boolean;
}

function PrivateRoute({ children, user, fetchAuthData, authenticated, path, route, isActive, ...rest }: PrivateRouteProps & any): any {
    if (authenticated && !user) {
        window.location.href = DOMAIN + '/authentication';
        return;
    }
    /**
     * Just dispatch the action to fetch authData when this route is activated.
     */
    if (!authenticated && isActive) {
        fetchAuthData();
    }
    return (
        <Route {...rest} path={path}
               render={({ location }) =>
                   authenticated ? (
                       children
                   ) : (
                       <div>Loading component</div>
                       // <Redirect
                       //     to={{
                       //         pathname: "/login",
                       //         state: { from: location }
                       //     }}
                       // />
                   )
               }
        >
        </Route>
    );
}

const mapStateToProps = ({app, router}: IndexState) => ({
    user: app.user,
    pathname: router.location.pathname,
    authenticated: app.authenticated
});

const connected = connect(mapStateToProps, {fetchAuthData})(PrivateRoute);

export default connected;
