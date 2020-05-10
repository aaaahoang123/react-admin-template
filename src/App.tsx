import React from 'react';
import './App.module.less';
import {Affix, Col, Layout, PageHeader, Row} from 'antd';
import Sidebar from './layouts/Sidebar';
import AppHeader from './layouts/AppHeader';
import DrawerSidebar from './layouts/DrawerSidebar';
import './index.less';
import RouterOutlet from './layouts/RouterOutlet';
import {triggerSidebar} from './App.actions';

const {Content, Footer} = Layout;

interface AppProps {
    sidebarCollapse?: boolean;
    triggerSidebar?: typeof triggerSidebar;
    isMobile?: boolean;
}

function App(props: AppProps) {
    return (
        <>
            <DrawerSidebar/>
            <Layout>
                <AppHeader/>
                <Layout className="site-layout">
                    <Row style={{width: '100%'}}>
                        <Col xs={0} sm={0} md={6} lg={6} xl={5} xxl={4}>
                            <Affix offsetTop={0}>
                                <Sidebar/>
                            </Affix>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
                            <Layout>
                                <PageHeader
                                    onBack={() => null}
                                    title="Title"
                                    subTitle="This is a subtitle"
                                />
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
            </Layout>
        </>
    );
}

// const mapStateToProps = ({app}: IndexState) => ({
//     sidebarCollapse: app.sidebarCollapse,
//     isMobile: app.isMobile
// });
//
// const connected = connect(mapStateToProps, {triggerSidebar})(App);

export default App;
