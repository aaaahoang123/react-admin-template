import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {RouteData} from './route-data';

export interface Route {
    path: string;
    component?: React.ComponentType<any>;
    data?: RouteData;
    protected?: boolean;
    children?: Route[];
}

export declare type Routes = Route[];
