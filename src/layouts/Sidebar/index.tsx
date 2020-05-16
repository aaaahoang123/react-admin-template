import {Layout, Menu} from 'antd';
import React from 'react';
import {IndexState} from '../../core/index.state';
import {connect} from 'react-redux';
import SidebarItem from './item';

const {Sider} = Layout;

export interface SidebarProps {
    sidebarCollapse: boolean;
    pathname: string;
    routes: string[];
}

function Sidebar({sidebarCollapse, pathname, routes}: SidebarProps) {
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

const mapStateToProps = ({app, router, routes}: IndexState): SidebarProps => ({
    sidebarCollapse: app.sidebarCollapse,
    pathname: router.location.pathname,
    routes: routes.rootRoutes
})

const connected = connect(mapStateToProps)(Sidebar);

export default connected;
