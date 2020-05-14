import {connect} from 'react-redux';
import React from 'react';
import {PageHeader} from 'antd';
import {IndexState} from '../core/index.state';
import {Route} from '../entities/common/route';
import { Link } from 'react-router-dom';
import {User} from '../entities/api/user';

interface AppPageHeaderProps {
    activeRoute?: Route;
    breadcrumb?: any[];
    user?: User;
}

function Component({activeRoute, breadcrumb, user}: AppPageHeaderProps) {
    let headerLinks: any[] = [];
    if (activeRoute?.data?.headerLinks) {
        const rawHeaderLinks = Array.isArray(activeRoute.data.headerLinks)
            ? activeRoute.data.headerLinks
            : [activeRoute.data.headerLinks];

        headerLinks = rawHeaderLinks.map(headerLink => <Link to={headerLink.navigateTo}
                                                             key={headerLink.navigateTo}
                                                             className={'ant-btn ant-btn-' + (headerLink.type || 'primary')}
        >{headerLink.title}</Link>)
    }

    return user ? (
        <PageHeader
            onBack={() => null}
            title={activeRoute?.data?.title}
            breadcrumb={{routes: breadcrumb}}
            extra={headerLinks}
            // subTitle="This is a subtitle"
        />
    ) : null;
}

const mapStateToProps = ({routes, app}: IndexState, ownProps: AppPageHeaderProps) => ({
    activeRoute: routes.routes[routes.activatedRoutes[0] || ''],
    breadcrumb: routes.activatedRoutes.reverse().map(path => {
        return {
            path: path,
            breadcrumbName: routes.routes[path]?.data?.title,
        };
    }),
    user: app.user
})

const AppPageHeader = connect(mapStateToProps)(Component);

export default AppPageHeader;
