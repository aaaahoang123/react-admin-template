// import {useSelector} from 'react-redux';
// import AppState from '../../App.state';
import {Route} from 'react-hook-guard';

export function useAuthorizationGuard(route: Route) {
    return true;
    // Authorize the role of user here
    // const user = useSelector((state: AppState) => state.auth.user);
    // return !!user.roles.includes(route.data.roles);
}
