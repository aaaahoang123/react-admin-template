import {Routes} from '../entities/common/route';
import {RouteEnum} from './route.enum';
import Login from '../modules/main/Login';
import Dashboard from '../modules/main/Dashboard';

const IndexRouter: Routes = [
    {
        path: RouteEnum.dashboard,
        component: Dashboard,
        protected: true,
        data: {
            title: 'Đăng nhập 2',
            display: false,
        },
    },
    {
        path: RouteEnum.dashboard + '1',
        component: Dashboard,
        protected: true,
        data: {
            title: 'Đăng nhập 2',
            display: false,
        },
    },
    {
        path: RouteEnum.root,
        data: {
            title: 'Đăng nhập',
            display: false
        },
        children: [
            {
                path: RouteEnum.login,
                component: Login,
                data: {
                    title: 'Đăng nhập',
                    display: false
                }
            }
        ]
    },
];

export default IndexRouter;
