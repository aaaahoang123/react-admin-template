import Sidebar from './Sidebar';
import {Drawer} from 'antd';
import React from 'react';
import { triggerSidebar } from '../App.reducer';
import {RootState} from '../core/state';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

const styles = require('./DrawerSidebar.module.less');

function DrawerSidebar() {
    const {sidebarCollapse, isMobile, authenticated: isAuthenticated} = useSelector(({app}: RootState) => app, shallowEqual);
    const dispatch = useDispatch();

    const trigger = () => dispatch(triggerSidebar())
    return (
        <Drawer
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={trigger}
            visible={sidebarCollapse && isMobile && isAuthenticated}
            className={styles.drawer}
        >
            <Sidebar />
        </Drawer>
    );
}

export default DrawerSidebar;
