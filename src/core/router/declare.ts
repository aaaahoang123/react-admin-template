import {ComponentType} from 'react';
import {ButtonType} from 'antd/lib/button/button';

export enum MenuType {
    NONE = 'NONE',
    ITEM = 'ITEM',
    SUBMENU = 'SUBMENU'
}

export interface NavigateButton {
    navigate: string;
    title: string;
    type?: ButtonType;
    icon?: ComponentType<any>;
}

export interface RouteData {
    title?: string;
    icon?: any;
    menuDisplay?: boolean;
    menuType?: MenuType;
    navigateButtons?: NavigateButton | NavigateButton[];
    [key: string]: any;
}
