export interface ActionPayload<T = any> {
    type: string;
    payload: T;
}
