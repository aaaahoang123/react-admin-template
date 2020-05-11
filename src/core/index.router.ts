import {Routes} from '../entities/common/route';
import {RouteEnum} from './route.enum';
import Login from '../modules/main/Login';
import Dashboard from '../modules/main/Dashboard';
import VehicleCategoryForm from '../modules/vehicle-category/Form';
import {AuthScope} from '../entities/enum/auth-scope';
import {
    GroupOutlined,
    DashboardOutlined
} from '@ant-design/icons/';

const IndexRouter: Routes = [
    {
        path: RouteEnum.dashboard,
        component: Dashboard,
        protected: true,
        data: {
            title: 'Dashboard',
            display: true,
            icon: DashboardOutlined
        },
    },
    {
        path: RouteEnum.vehicle_categories,
        protected: true,
        data: {
            title: 'Nhóm xe',
            display: true,
            icon: GroupOutlined,
            role: AuthScope.CAN_MANAGE_VEHICLE_CATEGORIES
        },
        children: [
            {
                path: RouteEnum.create,
                component: VehicleCategoryForm,
                data: {
                    title: 'Tạo nhóm xe',
                    display: true
                }
            }
        ]
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
