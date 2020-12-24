import {ComponentType} from 'react';
import {RouteComponentProps} from 'react-router';
import {ButtonType} from 'antd/lib/button/button';

export declare type CanActivateFn = (route: RouteConfig) => boolean;

export enum MenuType {
    NONE = 'NONE',
    ITEM = 'ITEM',
    SUBMENU = 'SUBMENU'
}

export interface RouteData {
    title?: string;
    icon?: any;
    menuDisplay?: boolean;
    menuType?: MenuType;
    navigateButtons?: NavigateButton | NavigateButton[];
    [key: string]: any;
}

export interface NavigateButton {
    navigate: string;
    title: string;
    type?: ButtonType;
    icon?: ComponentType<any>;
}

export interface RouteConfig {
    path: string;
    component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    redirectTo?: string;
    canActivate?: CanActivateFn;
    data?: RouteData;
    children?: Routes;
    exact?: boolean;
}

export declare type Routes = RouteConfig[];

export interface WithRoutesComponentProps {
    routes: Routes;
    className?: string;
}
