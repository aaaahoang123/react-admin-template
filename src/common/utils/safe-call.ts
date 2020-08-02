export function safeCall(calling: (...args: any[]) => any, onReject?: (e: any) => void) {
    return function* (...args: any[]) {
        try {
            return yield calling(...args);
        } catch (e) {
            if (onReject) {
                onReject(e);
            }
        }
    }
}
