import {Routes} from '../entities/common/route';
import {RouteEnum} from '../common/enums/route.enum';
import Login from '../modules/main/Login';
import Dashboard from '../modules/main/Dashboard';
import VehicleCategoryForm from '../modules/vehicle-category/Form';
import {AuthScope} from '../entities/enum/auth-scope';
import {DashboardOutlined, GroupOutlined} from '@ant-design/icons/';
import VehicleCategoriesList from '../modules/vehicle-category/List';
import VehicleCategoryEditForm from '../modules/vehicle-category/Form/edit';

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
                path: RouteEnum.self,
                component: VehicleCategoriesList,
                protected: true,
                data: {
                    title: 'Nhóm xe',
                    display: true,
                    headerLinks: {
                        navigateTo: RouteEnum.vehicle_categories + RouteEnum.create,
                        title: 'Tạo nhóm xe'
                    }
                }
            },
            {
                path: RouteEnum.create,
                component: VehicleCategoryForm,
                protected: true,
                data: {
                    title: 'Tạo nhóm xe',
                    display: true
                }
            },
            {
                path: RouteEnum.edit + '/:id',
                component: VehicleCategoryEditForm,
                protected: true,
                data: {
                    title: 'Sửa nhóm xe',
                    display: false
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
