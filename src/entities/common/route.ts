import * as React from 'react';
import {RouteData} from './route-data';

export interface Route {
    path: string;
    redirectTo?: string;
    component?: React.ComponentType<any>;
    data?: RouteData;
    protected?: boolean;
    children?: Route[];
    isActive?: boolean;
}

export declare type Routes = Route[];
