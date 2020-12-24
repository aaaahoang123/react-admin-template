import React, {memo, useMemo} from 'react';
import {Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {MenuType, RouteConfig, Routes, WithRoutesComponentProps} from '../../core/router';
import {MenuItemProps} from 'antd/es/menu/MenuItem';

const styles = require('./sidebar.module.less');
const {SubMenu, Item} = Menu;

interface MenuRenderProps extends MenuItemProps {
    route: RouteConfig;
    level: number;
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
        <Item key={route.path} level={level} {...props} icon={route.data?.icon ? <route.data.icon/> : null}>
            <Link to={route.path as string}>{route.data.title}</Link>
        </Item>
    );
}, (prev, next) => {
    const route = prev.route.path;
    return !prev.selectedKeys?.includes(route) && !next.selectedKeys?.includes(route);
});

const takeAllSubMenuPathFromRoutes = (routes: Routes, currentResult: string[] = []) => {
    routes.forEach(route => {
        if (route.data?.menuType === MenuType.SUBMENU) {
            currentResult.push(route.path);
        }
        if (route.children?.length) {
            takeAllSubMenuPathFromRoutes(route.children, currentResult);
        }
    });
    return currentResult;
};

function Sidebar({routes}: WithRoutesComponentProps) {
    const {pathname} = useLocation();
    const openKeys = useMemo(() => {
        return takeAllSubMenuPathFromRoutes(routes);
    }, [routes]);

    return (
        <>
            <div className={styles.sidebarLogo}>
                <a href="https://ng.ant.design/" target="_blank" rel="noopener noreferrer">
                    <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo"/>
                    <h1>Ant Design Of React</h1>
                </a>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[pathname]} defaultOpenKeys={openKeys}>
                {
                    routes?.map(route => (
                        <MenuRender route={route} level={1} key={route.path}/>
                    ))
                }
            </Menu>
            {/*<footer style={{textAlign: 'center', color: 'white'}}>Ant Design ©2018 Created by Ant UED</footer>*/}
        </>
    )
}

export default Sidebar;
