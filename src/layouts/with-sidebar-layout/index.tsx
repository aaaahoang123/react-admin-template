import React, {useState} from 'react';
import {Layout} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import Sidebar from './Sidebar';
import {RouterOutlet, WithRoutesComponentProps} from '../../core/router';
import AppPageHeader from './PageHeader';

const {Sider, Header, Content, Footer} = Layout;

const styles = require('./index.module.less');

const WithSidebarLayout = ({routes}: WithRoutesComponentProps) => {
    const [isCollapsed, setCollapsed] = useState(false);

    function triggerCollapse() {
        setCollapsed(!isCollapsed);
    }

    return (
        <Layout className={styles.appLayout}>
            <Sider
                collapsible={true}
                width={'256px'}
                breakpoint={'md'}
                collapsed={isCollapsed}
                collapsedWidth={0}
                trigger={null}
                className={styles.menuSidebar + ' ' + styles.sider}
                onCollapse={triggerCollapse}
            >
                <Sidebar routes={routes}/>
            </Sider>

            <Layout>
                <Header className={styles.header}>
                    <div className={styles.appHeader}>
                        <span className={styles.headerTrigger} onClick={triggerCollapse}>
                            {
                                isCollapsed
                                    ? <MenuUnfoldOutlined/>
                                    : <MenuFoldOutlined/>
                            }
                        </span>
                    </div>
                </Header>
                <AppPageHeader routes={routes} />
                <Content className={styles.content}>
                    <section className={styles.innerContent}>
                        <RouterOutlet routes={routes}/>
                    </section>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Content>
            </Layout>
        </Layout>
    );
};

export default WithSidebarLayout;
