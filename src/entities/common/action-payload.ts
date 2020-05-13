export interface ActionPayload<T = any, U = any> {
    type: string;
    payload: T;
    additionalInfo?: U;
}
