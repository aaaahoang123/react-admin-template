import {Layout} from 'antd';
import Sidebar from './Sidebar';
import {RouterOutlet, WithRouteProps} from 'react-hook-guard';
import AppPageHeader from './PageHeader';
import Header from './Header';

const {Content, Footer} = Layout;

const WithSidebarLayout = ({route}: WithRouteProps) => {
    return (
        <Layout className="min-h-screen">
            <Sidebar routes={route?.children}/>

            <Layout>
                <Header />
                <AppPageHeader routes={route?.children} />
                <Content className="block mx-6 bg-white p-6">
                    <RouterOutlet routes={route?.children}/>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default WithSidebarLayout;
