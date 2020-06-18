import React, {useEffect} from 'react';
import './App.module.less';
import {Layout} from 'antd';
import AppHeader from './layouts/AppHeader';
import DrawerSidebar from './layouts/DrawerSidebar';
import './index.less';
import MainContent from './layouts/MainContent';
import {useDispatch} from 'react-redux';
import {appInitialize} from './App.reducer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appInitialize());
    }, [dispatch])

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
