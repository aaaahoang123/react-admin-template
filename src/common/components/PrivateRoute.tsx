import React from "react";
import { Route } from "react-router-dom";
import {IndexState} from '../../core/index.state';
import {connect} from 'react-redux';
import {User} from '../../entities/api/user';
import {DOMAIN} from '../../core/properties';
import {fetchAuthData} from '../../App.actions';

interface PrivateRouteProps {
    user?: User;
    authChecked: boolean;
    fetchAuthData: typeof fetchAuthData;
    pathname: string;
    path: string;
}

function PrivateRoute({ children, user, fetchAuthData, authChecked, pathname, path, ...rest }: PrivateRouteProps & any): any {
    if (authChecked && !user) {
        window.location.href = DOMAIN + '/authentication';
        return;
    }
    /**
     * Because all the PrivateRoute has render when the app bootstrap
     * So we must compare the pathname from router with the path of this PrivateRoute
     * If they're equal, so the Route is activating and we can trigger the actions to fetch userData
     */
    if (pathname === path && !authChecked) {
        fetchAuthData();
    }
    return (
        <Route {...rest} path={path}
               render={({ location }) =>
                   authChecked ? (
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
    authChecked: app.authChecked,
    pathname: router.location.pathname
});

const connected = connect(mapStateToProps, {fetchAuthData})(PrivateRoute);

export default connected;
