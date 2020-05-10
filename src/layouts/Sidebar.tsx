import {Layout, Menu} from 'antd';
import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const {Sider} = Layout;
export interface SidebarProps {
    sidebarCollapse: boolean;
}

function Sidebar({sidebarCollapse}: SidebarProps) {
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
            <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                    <UserOutlined />
                    <Link to={'/login'}>Login</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <VideoCameraOutlined />
                    <Link to={'/dashboard'}>Login 2</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<BarChartOutlined />}>
                    nav 4
                </Menu.Item>
                <Menu.Item key="5" icon={<CloudOutlined />}>
                    nav 5
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    nav 6
                </Menu.Item>
                <Menu.Item key="7" icon={<TeamOutlined />}>
                    nav 7
                </Menu.Item>
                <Menu.Item key="8" icon={<ShopOutlined />}>
                    nav 8
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

const mapStateToProps = ({app}: IndexState): SidebarProps => ({
    sidebarCollapse: app.sidebarCollapse
})

const connected = connect(mapStateToProps)(Sidebar)

export default connected;
