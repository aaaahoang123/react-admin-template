import React from 'react';
import './App.module.less';
import {Affix, Col, Layout, Row} from 'antd';
import Sidebar from './layouts/Sidebar';
import AppHeader from './layouts/AppHeader';
import DrawerSidebar from './layouts/DrawerSidebar';
import './index.less';
import RouterOutlet from './layouts/RouterOutlet';
import {triggerSidebar} from './App.actions';
import AppPageHeader from './layouts/AppPageHeader';
import {User} from './entities/api/user';
import {IndexState} from './core/index.state';
import {connect} from 'react-redux';

const {Content, Footer} = Layout;

interface AppProps {
    sidebarCollapse?: boolean;
    triggerSidebar?: typeof triggerSidebar;
    isMobile?: boolean;
    user?: User;
}

// const AffixSidebar = React.forwardRef((props, ref: any) => (
//         <Affix offsetTop={0}>
//             <Sidebar/>
//         </Affix>
// ));

function App({user}: AppProps) {
    return (
        <>
            <DrawerSidebar/>
            <Layout>
                <AppHeader/>
                <Layout className="site-layout">
                    <Row style={{width: '100%'}}>
                        <Col xs={0}
                             sm={0}
                             md={user ? 6 : 0}
                             lg={user ? 6 : 0}
                             xl={user ? 5 : 0}
                             xxl={user ? 4 : 0}>
                            <Affix offsetTop={0}>
                                <Sidebar />
                            </Affix>
                        </Col>
                        <Col xs={24}
                             sm={24}
                             md={user ? 18 : 24}
                             lg={user ? 18 : 24}
                             xl={user ? 19 : 24}
                             xxl={user ? 20: 24}>
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
            </Layout>
        </>
    );
}

const mapStateToProps = ({app}: IndexState) => ({
    sidebarCollapse: app.sidebarCollapse,
    isMobile: app.isMobile,
    user: app.user
});

const connected = connect(mapStateToProps, {triggerSidebar})(App);

export default connected;
