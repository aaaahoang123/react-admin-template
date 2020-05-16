import {ButtonType} from 'antd/lib/button/button';

export interface HeaderLink {
    type?: ButtonType;
    navigateTo: string;
    title: string;
}

export interface RouteData {
    title?: string;
    icon?: any;
    role?: any;
    display?: boolean;
    headerLinks?: HeaderLink | HeaderLink[];
}
