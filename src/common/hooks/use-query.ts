import {useLocation} from 'react-router-dom';
import {useMemo} from 'react';
import toNumber from 'lodash/toNumber';

function useQuery(name?: string) {
    const location = useLocation();
    return useMemo(() => {
        const params = new URLSearchParams(location.search);
        if (name) {
            const dirtyParams = params.get(name);
            return dirtyParams ? (toNumber(dirtyParams) || dirtyParams) : dirtyParams;
        }
        const result: any = {};
        params.forEach((value, key) => {
            result[key] = value ? (toNumber(value) || value) : value;
        });
        return result;
    }, [location, name]);
}

export default useQuery;
