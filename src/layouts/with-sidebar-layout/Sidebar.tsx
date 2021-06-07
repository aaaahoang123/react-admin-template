import React, {memo, useMemo} from 'react';
import {Menu, Layout} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {MenuType} from '../../core/router';
import {MenuItemProps} from 'antd/es/menu/MenuItem';
import {useSidebarCollapse} from './collapse';
import {WithRoutesProps, Routes, Route} from 'react-hook-guard';

const {SubMenu, Item} = Menu;
const {Sider} = Layout;

interface MenuRenderProps extends MenuItemProps {
    route: Route;
    level: number;
    selectedKeys?: string;
}

const MenuRender = memo(({route, level, ...props}: MenuRenderProps) => {
    if (!route.data?.menuDisplay) {
        return null;
    }
    if (route.data?.menuType === MenuType.NONE && route.children?.length) {
        return (
            <>{
                route.children.map(child => (
                    <MenuRender key={route.path}
                                route={child}
                                level={level}
                    />
                ))
            }</>
        );
    }
    if (route.data?.menuType === MenuType.SUBMENU && route.children?.length) {
        return (
            <SubMenu key={route.path}
                     icon={route.data?.icon ? <route.data.icon/> : null}
                     title={route.data.title}
                     level={level}
                     {...props}
            >{
                route.children?.map(child => (
                    <MenuRender route={child}
                                level={level + 1}
                                key={child.path}
                    />
                ))
            }</SubMenu>
        );
    }

    return (
        <>
            <Item key={route.path} {...props} icon={route.data?.icon ? <route.data.icon/> : null}>
                <Link to={route.path as string}>{route.data?.title}</Link>
            </Item>
        </>

    );
}, (prev, next) => {
    const route = prev.route.path;
    return !prev.selectedKeys?.includes(route) && !next.selectedKeys?.includes(route);
});

const takeAllSubMenuPathFromRoutes = (routes?: Routes, currentResult: string[] = []) => {
    routes?.forEach(route => {
        if (route.data?.menuType === MenuType.SUBMENU) {
            currentResult.push(route.path);
        }
        if (route.children?.length) {
            takeAllSubMenuPathFromRoutes(route.children, currentResult);
        }
    });
    return currentResult;
};

function SidebarInternal({routes}: WithRoutesProps) {
    const {pathname} = useLocation();
    const openKeys = useMemo(() => {
        return takeAllSubMenuPathFromRoutes(routes);
    }, [routes]);

    return (
        <>
            <div className="relative h-16 pl-4 overflow-hidden theme-sidebar-header-bg transition-all leading-16">
                <Link to={'/'}>
                    <img src="https://ng.ant.design/assets/img/logo.svg"
                         alt="logo"
                         className="inline-block h-8 w-8 align-middle"/>
                    <h1 className="inline-block ml-5 text-white font-bold align-middle">Ant Design Of React</h1>
                </Link>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[pathname]} defaultOpenKeys={openKeys}>
                {
                    routes?.map(route => (
                        <MenuRender route={route} level={1} key={route.path}/>
                    ))
                }
            </Menu>
        </>
    );
}

const Sidebar = memo(({routes, className}: WithRoutesProps) => {
    const isCollapsed = useSidebarCollapse();

    return (
        <Sider
            collapsible={true}
            width={'256px'}
            breakpoint={'md'}
            collapsed={isCollapsed}
            collapsedWidth={0}
            trigger={null}
            className={`z-10 h-screen shadow overflow-auto h-100 sticky left-0 top-0 overflow-y-auto ${className ?? ''}`}
            theme={'dark'}
        >
            <SidebarInternal routes={routes}/>
        </Sider>
    )
})

export default Sidebar;
