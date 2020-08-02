import {Layout, Menu} from 'antd';
import React from 'react';
import {RootState} from '../../core/state';
import {shallowEqual, useSelector} from 'react-redux';
import SidebarItem from './item';

const {Sider} = Layout;

function Sidebar() {
    const {pathname, routes} = useSelector(({app, router, routes}: RootState) => ({
        pathname: router.location.pathname,
        routes: routes.rootRoutes
    }), shallowEqual);

    return (
        <Sider
            style={{
                backgroundColor: '#fff'
                // overflow: 'auto',
                // height: '100vh',
                // position: 'fixed',
                // left: 0,
                // zIndex: 1
            }}
            width='100%'
            // collapsed={sidebarCollapse}
        >
            <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={routes}>
                {
                    routes.map(route => <SidebarItem path={route} key={route} />)
                }
            </Menu>
        </Sider>
    );
}

export default Sidebar;
