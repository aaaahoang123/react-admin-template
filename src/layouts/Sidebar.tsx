import {Layout, Menu} from 'antd';
import React from 'react';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Routes} from '../entities/common/route';
// import Routes from '../core/index.router';

const {Sider} = Layout;
const { SubMenu, Item } = Menu;
export interface SidebarProps {
    sidebarCollapse: boolean;
    pathname: string;
    routes: Routes
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
            <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={routes.map(route => route.path)}>
                {
                    routes.filter(route => route.data?.display).map(route => {
                        return route?.children?.length
                            ? (
                                <SubMenu key={route.path} icon={route.data?.icon ? <route.data.icon /> : null} title={route.data?.title}>
                                    {
                                        route.children.filter(child => child.data?.display).map(child => (
                                            <Item key={route.path + child.path}>
                                                <Link to={route.path + child.path}>{child.data?.title}</Link>
                                            </Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                            : (
                                <Item key={route.path} title={route.data?.title}>
                                    {route.data?.icon ? <route.data.icon /> : null}
                                    <Link to={route.path} >{route.data?.title}</Link>
                                </Item>
                            )
                    })
                }
            </Menu>
        </Sider>
    );
}

const mapStateToProps = ({app, router, routes}: IndexState): SidebarProps => ({
    sidebarCollapse: app.sidebarCollapse,
    pathname: router.location.pathname,
    routes: routes
})

const connected = connect(mapStateToProps)(Sidebar)

export default connected;
