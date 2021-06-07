import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {selectAuthenticated} from './selectors';

export function useGuestGuard() {
    const authenticated = useSelector(selectAuthenticated);
    const history = useHistory();

    if (authenticated) {
        history.push('/dashboard');
    }
    return !authenticated;
}
