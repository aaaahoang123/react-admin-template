import {Affix, Col, Layout, Row} from 'antd';
import Sidebar from './Sidebar';
import AppPageHeader from './AppPageHeader';
import RouterOutlet from './RouterOutlet';
import React from 'react';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';
import {triggerSidebar} from '../App.reducer';
import {User} from '../entities/api/user';

const {Content, Footer} = Layout;

interface MainContentProps {
    // sidebarCollapse?: boolean;
    // triggerSidebar?: typeof triggerSidebar;
    // isMobile?: boolean;
    user?: User;
}

function Component({user}: MainContentProps) {
    return (
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
    );
}

const mapStateToProps = ({app}: IndexState) => ({
    user: app.user
});

const MainContent = connect(mapStateToProps, {triggerSidebar})(Component);

export default MainContent;
