import React from 'react';
import './App.module.less';
import {Layout} from 'antd';
import AppHeader from './layouts/AppHeader';
import DrawerSidebar from './layouts/DrawerSidebar';
import './index.less';
import MainContent from './layouts/MainContent';

function App() {
    return (
        <>
            <DrawerSidebar/>
            <Layout>
                <AppHeader/>
                <MainContent />
            </Layout>
        </>
    );
}

export default App;
