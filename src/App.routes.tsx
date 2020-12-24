import {MenuType, Routes} from './core/router';
import WithSidebarLayout from './layouts/with-sidebar-layout';
import {lazy} from 'react';
import {
    DashboardOutlined, OrderedListOutlined
} from '@ant-design/icons';
import MiddleContentLayout from './layouts/middle-content-layout';
import {RouterEnum} from './common/enums';

const {create, edit, list} = RouterEnum;

const appRoutes: Routes = [
    {
        path: '/auth',
        component: MiddleContentLayout,
        children: [
            {
                path: '/auth/login',
                component: lazy(() => import('./features/auth/login')),
                data: {
                    title: 'Đăng nhập',
                    menuDisplay: false,
                }
            }
        ]
    },
    {
        path: '/',
        component: WithSidebarLayout,
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
                path: RouterEnum.categories,
                data: {
                    title: 'Quản lý danh mục',
                    menuType: MenuType.SUBMENU,
                    menuDisplay: true,
                    icon: OrderedListOutlined
                },
                children: [
                    {
                        path: `${RouterEnum.categories}${create}`,
                        component: lazy(() => import('./features/category/Form')),
                        data: {
                            title: 'Tạo danh mục',
                            menuDisplay: true
                        }
                    },
                    {
                        path: `${RouterEnum.categories}${edit}/:id`,
                        component: lazy(() => import('./features/category/Form')),
                        data: {
                            title: 'Sửa danh mục',
                            menuDisplay: false
                        }
                    },
                    {
                        path: `${RouterEnum.categories}${list}`,
                        component: lazy(() => import('./features/category/Table')),
                        data: {
                            title: 'Danh mục',
                            menuDisplay: true
                        }
                    }
                ]
            },
            // {
            //     path: RouterEnum.employees,
            //     data: {
            //         title: 'Quản lý nhân viên',
            //         menuType: MenuType.SUBMENU,
            //         icon: UserOutlined,
            //         menuDisplay: true
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.employees}${RouterEnum.operators}`,
            //             component: lazy(() => import('./features/user/Table')),
            //             data: {
            //                 title: 'Tổng đài viên',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true,
            //                 navigateButtons: {
            //                     navigate: `${RouterEnum.employees}${create}`,
            //                     title: 'Thêm nhân viên'
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.employees}${RouterEnum.drivers}`,
            //             component: lazy(() => import('./features/user/Table')),
            //             data: {
            //                 title: 'Tài xế',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true,
            //                 navigateButtons: {
            //                     navigate: `${RouterEnum.employees}${create}`,
            //                     title: 'Thêm nhân viên'
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.employees}${create}`,
            //             component: lazy(() => import('./features/user/Form')),
            //             data: {
            //                 title: 'Thêm nhân viên',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.employees}${edit}/:id`,
            //             component: lazy(() => import('./features/user/Form')),
            //             data: {
            //                 title: 'Sửa thông tin nhân viên',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.schedule_templates,
            //     data: {
            //         title: 'Quản lý mẫu lịch',
            //         menuType: MenuType.SUBMENU,
            //         icon: CalendarOutlined,
            //         menuDisplay: true
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.schedule_templates}${list}`,
            //             component: lazy(() => import('./features/schedule-template/Table')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Danh sách mẫu lịch',
            //                 navigateButtons: {
            //                     title: 'Thêm mẫu lịch',
            //                     navigate: `${RouterEnum.schedule_templates}${create}`
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.schedule_templates}${create}`,
            //             component: lazy(() => import('./features/schedule-template/Form')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Thêm mẫu lịch'
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.schedule_templates}${edit}/:id`,
            //             component: lazy(() => import('./features/schedule-template/Form')),
            //             data: {
            //                 menuDisplay: false,
            //                 title: 'Sửa mẫu lịch'
            //             }
            //         },
            //
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.customers,
            //     data: {
            //         title: 'Quản lý khách hàng',
            //         menuType: MenuType.SUBMENU,
            //         icon: CrownOutlined,
            //         menuDisplay: true
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.customers}${RouterEnum.list}`,
            //             component: lazy(() => import('./features/customer/Table')),
            //             data: {
            //                 title: 'Danh sách khách hàng',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true,
            //                 navigateButtons: {
            //                     navigate: `${RouterEnum.customers}${RouterEnum.create}`,
            //                     title: 'Thêm khách hàng'
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.customers}${RouterEnum.create}`,
            //             component: lazy(() => import('./features/customer/Form')),
            //             data: {
            //                 title: 'Thêm khách hàng',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.customers}${RouterEnum.edit}/:id`,
            //             component: lazy(() => import('./features/customer/Form')),
            //             data: {
            //                 title: 'Sửa thông tin khách hàng',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.voyages,
            //     data: {
            //         title: 'Quản lý tuyến đường',
            //         menuType: MenuType.SUBMENU,
            //         icon: OrderedListOutlined,
            //         menuDisplay: true
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.voyages}${RouterEnum.list}`,
            //             component: lazy(() => import('./features/voyage/Table')),
            //             data: {
            //                 title: 'Danh sách tuyến đường',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.voyages}${RouterEnum.create}`,
            //             component: lazy(() => import('./features/voyage/Form')),
            //             data: {
            //                 title: 'Tạo tuyến đường',
            //                 menuType: MenuType.ITEM,
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.voyages}${RouterEnum.edit}/:id`,
            //             component: lazy(() => import('./features/voyage/Form')),
            //             data: {
            //                 title: 'Sửa tuyến đường',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.distance_library,
            //     data: {
            //         title: 'Thư viện địa chỉ',
            //         menuType: MenuType.SUBMENU,
            //         menuDisplay: true,
            //         icon: GlobalOutlined
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.distance_library}${list}`,
            //             component: lazy(() => import('./features/distance-library/Table')),
            //             data: {
            //                 title: 'Danh mục địa chỉ',
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.distance_library}${create}`,
            //             component: lazy(() => import('./features/distance-library/Form')),
            //             data: {
            //                 title: 'Thêm bản ghỉ',
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.distance_library}${edit}/:id`,
            //             component: lazy(() => import('./features/distance-library/Form')),
            //             data: {
            //                 title: 'Sửa bản ghi',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.vehicles,
            //     data: {
            //         title: 'Quản lý xe',
            //         menuType: MenuType.SUBMENU,
            //         menuDisplay: true,
            //         icon: CarOutlined
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.vehicles}${list}`,
            //             component: lazy(() => import('./features/vehicle/Table')),
            //             data: {
            //                 title: 'Danh sách xe',
            //                 menuDisplay: true,
            //                 navigateButtons: {
            //                     title: 'Thêm xe',
            //                     navigate: `${RouterEnum.vehicles}${create}`
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.vehicles}${create}`,
            //             component: lazy(() => import('./features/vehicle/Form')),
            //             data: {
            //                 title: 'Thêm xe',
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.vehicles}${edit}/:id`,
            //             component: lazy(() => import('./features/vehicle/Form')),
            //             data: {
            //                 title: 'Sửa thông tin xe',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.vehicle_categories,
            //     data: {
            //         title: 'Quản lý nhóm xe',
            //         menuType: MenuType.SUBMENU,
            //         menuDisplay: true,
            //         icon: GroupOutlined
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.vehicle_categories}${list}`,
            //             component: lazy(() => import('./features/vehicle-category/Table')),
            //             data: {
            //                 title: 'Danh sách nhóm xe',
            //                 menuDisplay: true,
            //                 navigateButtons: {
            //                     navigate: `${RouterEnum.vehicle_categories}${create}`,
            //                     title: 'Tạo nhóm xe',
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.vehicle_categories}${create}`,
            //             component: lazy(() => import('./features/vehicle-category/Form')),
            //             data: {
            //                 title: 'Tạo nhóm xe',
            //                 menuDisplay: true
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.vehicle_categories}${edit}/:id`,
            //             component: lazy(() => import('./features/vehicle-category/Form')),
            //             data: {
            //                 title: 'Sửa nhóm xe',
            //                 menuDisplay: false
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.maintenance_plans,
            //     data: {
            //         title: 'Kế hoạch bảo dưỡng',
            //         menuType: MenuType.SUBMENU,
            //         menuDisplay: true,
            //         icon: ProjectOutlined
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.maintenance_plans}${list}`,
            //             component: lazy(() => import('./features/maintenance-plan/Table')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Danh sách kế hoạch',
            //                 navigateButtons: {
            //                     navigate: `${RouterEnum.maintenance_plans}${create}`,
            //                     title: 'Thêm kế hoạch'
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.maintenance_plans}${create}`,
            //             component: lazy(() => import('./features/maintenance-plan/Form')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Thêm kế hoạch'
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.maintenance_plans}${edit}/:id`,
            //             component: lazy(() => import('./features/maintenance-plan/Form')),
            //             data: {
            //                 menuDisplay: false,
            //                 title: 'Sửa kế hoạch'
            //             }
            //         }
            //     ]
            // },
            //
            // {
            //     path: RouterEnum.tickets,
            //     data: {
            //         title: 'Quản lý vé',
            //         menuDisplay: true,
            //         menuType: MenuType.SUBMENU,
            //         icon: TagOutlined
            //     },
            //     children: [
            //         {
            //             path: `${RouterEnum.tickets}${list}`,
            //             component: lazy(() => import('./features/ticket/Table')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Danh sách vé',
            //                 navigateButtons: {
            //                     title: 'Thêm vé',
            //                     navigate: `${RouterEnum.tickets}${create}`
            //                 }
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.tickets}${create}`,
            //             component: lazy(() => import('./features/ticket/Form')),
            //             data: {
            //                 menuDisplay: true,
            //                 title: 'Thêm vé'
            //             }
            //         },
            //         {
            //             path: `${RouterEnum.tickets}${edit}/:id`,
            //             component: lazy(() => import('./features/ticket/Form')),
            //             data: {
            //                 menuDisplay: false,
            //                 title: 'Sửa vé'
            //             }
            //         }
            //     ]
            // },

            {
                path: '/',
                redirectTo: RouterEnum.dashboard
            }
        ]
    },
];

export default appRoutes;
