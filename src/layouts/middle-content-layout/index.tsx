import React from 'react';
import {RouterOutlet, WithRoutesComponentProps} from '../../core/router';

const styles = require('./index.module.less');

function MiddleContentLayout({routes}: WithRoutesComponentProps) {
    return (
        <div className={styles.container}>
            <RouterOutlet routes={routes} />
        </div>
    );
}

export default MiddleContentLayout;
