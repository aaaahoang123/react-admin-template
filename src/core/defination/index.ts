import {PropsWithChildren} from 'react';

export declare interface Type<T> extends Function {
    new (...args: any[]): T;
}
