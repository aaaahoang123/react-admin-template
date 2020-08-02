import {Affix, Col, Layout, Row} from 'antd';
import Sidebar from './Sidebar';
import AppPageHeader from './AppPageHeader';
import RouterOutlet from './RouterOutlet';
import React from 'react';
import {RootState} from '../core/state';
import {shallowEqual, useSelector} from 'react-redux';

const {Content, Footer} = Layout;

function MainContent() {
    const {authenticated} = useSelector(({app}: RootState) => ({
        authenticated: app.authenticated
    }), shallowEqual);

    return (
        <Layout className="site-layout">
            <Row style={{width: '100%'}}>
                <Col xs={0}
                     sm={0}
                     md={authenticated ? 6 : 0}
                     lg={authenticated ? 6 : 0}
                     xl={authenticated ? 5 : 0}
                     xxl={authenticated ? 4 : 0}>
                    <Affix offsetTop={0}>
                        <Sidebar />
                    </Affix>
                </Col>
                <Col xs={24}
                     sm={24}
                     md={authenticated ? 18 : 24}
                     lg={authenticated ? 18 : 24}
                     xl={authenticated ? 19 : 24}
                     xxl={authenticated ? 20: 24}>
                    <Layout>
                        <AppPageHeader />
                        <Content style={{margin: '24px', overflow: 'initial'}}>
                            <div className="site-layout-background">
                                <RouterOutlet/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Col>
            </Row>
        </Layout>
    );
}

export default MainContent;
