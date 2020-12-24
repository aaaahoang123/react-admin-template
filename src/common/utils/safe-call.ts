import {APP_DEBUG} from '../../config/properties';

export function safeCall<Fn extends (...args: any[]) => any>(calling: Fn, onReject?: (e: any) => void): Fn {
    return function* (...args: any[]) {
        try {
            return yield calling(...args);
        } catch (e) {
            console.warn(e);
            if (APP_DEBUG) {

            }
            if (onReject) {
                onReject(e);
            }
        }
    } as any as Fn;
}
