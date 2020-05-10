import Sidebar from './Sidebar';
import {Drawer} from 'antd';
import React from 'react';
import { triggerSidebar } from '../App.actions';
import {IndexState} from '../core/index.state';
import {connect} from 'react-redux';

const styles = require('./DrawerSidebar.module.less');

interface DrawerSidebarProps {
    sidebarCollapse?: boolean;
    triggerSidebar?: typeof triggerSidebar;
    isMobile?: boolean;
}

function DrawerSidebar({sidebarCollapse, triggerSidebar, isMobile}: DrawerSidebarProps) {
    return (
        <Drawer
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={triggerSidebar}
            visible={sidebarCollapse && isMobile}
            className={styles.drawer}
        >
            <Sidebar />
        </Drawer>
    );
}

const mapStateToProps = ({app}: IndexState) => ({
    sidebarCollapse: app.sidebarCollapse,
    isMobile: app.isMobile
});

const connected = connect(mapStateToProps, {triggerSidebar})(DrawerSidebar);

export default connected;
