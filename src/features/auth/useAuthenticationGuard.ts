import { useSelector } from 'react-redux';
import {selectAuthenticated} from './selectors';
import {useHistory} from 'react-router-dom';

export function useAuthenticationGuard() {
    const authenticated = useSelector(selectAuthenticated);
    const history = useHistory();
    if (!authenticated) {
        history.push('/auth/login');
    }
    return authenticated;
}
