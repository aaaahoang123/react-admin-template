import {Layout} from 'antd';
import Sidebar from './Sidebar';
import {RouterOutlet, WithRoutesProps} from 'react-hook-guard';
import AppPageHeader from './PageHeader';
import Header from './Header';

const {Content, Footer} = Layout;

const WithSidebarLayout = ({routes, ...props}: WithRoutesProps) => {
    return (
        <Layout className="min-h-screen">
            <Sidebar routes={routes}/>

            <Layout>
                <Header />
                <AppPageHeader routes={routes} />
                <Content className="block mx-6 bg-white p-6">
                    <RouterOutlet {...props} routes={routes} />
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default WithSidebarLayout;
