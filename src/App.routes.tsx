import {MenuType, RouteData} from './core/router';
import {Routes} from 'react-hook-guard';
import WithSidebarLayout from './layouts/with-sidebar-layout';
import {lazy} from 'react';
import {
    DashboardOutlined,
} from '@ant-design/icons';
import MiddleContentLayout from './layouts/middle-content-layout';
import {RouterEnum} from './common/enums';
import {useAuthenticationGuard} from './features/auth/useAuthenticationGuard';
import {useGuestGuard} from './features/auth/useGuestGuard';
import {useAuthorizationGuard} from './features/auth/useAuthorizationGuard';

// const {create, edit, list} = RouterEnum;

const appRoutes: Routes<RouteData> = [
    {
        path: '/auth',
        component: MiddleContentLayout,
        canActivate: [useGuestGuard],
        children: [
            {
                path: '/auth/login',
                component: lazy(() => import('./features/auth/login')),
                data: {
                    title: 'Đăng nhập',
                    menuDisplay: false,
                }
            },
            {
                path: '/auth',
                redirectTo: '/auth/login'
            }
        ]
    },
    {
        path: '/',
        component: WithSidebarLayout,
        canActivate: [useAuthenticationGuard],
        canActivateChild: [useAuthorizationGuard],
        data: {
            menuType: MenuType.NONE
        },
        children: [
            {
                path: RouterEnum.dashboard,
                component: lazy(() => import('./features/dashboard')),
                data: {
                    title: 'Dashboard',
                    menuType: MenuType.ITEM,
                    menuDisplay: true,
                    icon: DashboardOutlined
                }
            },
            {
                path: '/test',
                component: lazy(() => import('./features/auth/login')),
                data: {
                    title: 'Testy',
                    menuType: MenuType.ITEM,
                    menuDisplay: true,
                    icon: DashboardOutlined
                }
            },
            {
                path: '/',
                redirectTo: RouterEnum.dashboard,
            }
        ]
    },
];

export default appRoutes;
