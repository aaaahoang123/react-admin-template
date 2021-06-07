import {useEffect, useRef} from 'react';
import isEqual from 'lodash/isEqual';

const useDeepEffect = (effectFunc: Function, deps: any[]) => {
    const isFirstRender = useRef(true);
    const prepDeps = useRef(deps);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return;
        }
        const isChangedDeps = deps.some((dep, index) => !isEqual(dep, prepDeps.current[index]));
        if (isChangedDeps) {
            effectFunc();
            prepDeps.current = deps;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default useDeepEffect;
