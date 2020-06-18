import React from 'react';
import {Col, Layout, Row} from 'antd';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';
import {triggerSidebar} from '../App.reducer';

const styles = require('./AppHeader.module.less');

interface AppHeaderProps {
    sidebarCollapse: boolean;
    triggerSidebar: typeof triggerSidebar;
    isMobile?: boolean;
}

function AppHeader({sidebarCollapse, triggerSidebar, isMobile}: AppHeaderProps) {
    return (
        <>
            <Layout.Header className={styles.header}>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
                        {
                            isMobile ?
                                React.createElement(sidebarCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: styles.trigger,
                                    onClick: triggerSidebar,
                                }) : null
                        }
                        <div className={styles.logo}>
                            Test App
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={18} lg={18} xl={19} xxl={20}>
                    </Col>
                </Row>
            </Layout.Header>
        </>
    );
}

const mapStateToProps = ({app}: IndexState) => ({
    sidebarCollapse: app.sidebarCollapse,
    isMobile: app.isMobile
});

const connected = connect(mapStateToProps, {triggerSidebar})(AppHeader)

export default connected;
