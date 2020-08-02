import React, {useEffect} from 'react';
import {Avatar, Button, Col, Dropdown, Layout, Menu, Row} from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import {RootState} from '../core/state';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {triggerSidebar} from '../App.reducer';
import {loadUserData, mainLogout} from '../modules/main/reducer';
import {MenuInfo} from 'rc-menu/es/interface';

const styles = require('./AppHeader.module.less');

const RightMenu = () => {

    const {user} = useSelector(({app}: RootState) => ({
        user: app.user
    }), shallowEqual);

    const dispatch = useDispatch();

    const handleMenuClick = (e: MenuInfo) => {
        if (e.key === 'logout') {
            dispatch(mainLogout());
        }
    }

    return (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="info">
                {user?.name}
            </Menu.Item>
            <Menu.Item key="logout">
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
};

const AuthDropDown = () => {
    const {user} = useSelector(({app}: RootState) => ({
        user: app.user
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserData())
    }, [dispatch]);

    return (
        <div className={styles.headerRight}>
            <Dropdown overlay={<RightMenu />}>
                <Button>
                    <Avatar shape="square"
                            icon={<UserOutlined />}
                            src={user?.avatar_url}
                            size={'small'}
                            className={'mr-2'}
                    /> {user?.name}
                </Button>
            </Dropdown>
        </div>
    );
};

function AppHeader() {
    const {sidebarCollapse, isMobile, authenticated} = useSelector(({app}: RootState) => ({
        sidebarCollapse: app.sidebarCollapse,
        isMobile: app.isMobile,
        authenticated: app.authenticated
    }));

    const dispatch = useDispatch();

    return (
        <>
            <Layout.Header className={styles.header}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
                        {
                            isMobile ?
                                React.createElement(sidebarCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: styles.trigger,
                                    onClick: () => dispatch(triggerSidebar()),
                                }) : null
                        }
                        <div className={styles.logo}>
                            Test App
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={18} lg={18} xl={19} xxl={20}>
                        {
                            authenticated
                                ? <AuthDropDown />
                                : null
                        }
                    </Col>
                </Row>
            </Layout.Header>
        </>
    );
}

export default AppHeader;
