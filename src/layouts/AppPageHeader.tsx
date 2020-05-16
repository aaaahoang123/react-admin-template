import {connect} from 'react-redux';
import React from 'react';
import {PageHeader} from 'antd';
import {IndexState} from '../core/index.state';
import {Route} from '../entities/common/route';
import {Route as BreadCrumbRoute} from 'antd/lib/breadcrumb/Breadcrumb';
import {Link} from 'react-router-dom';
import {User} from '../entities/api/user';
import { goBack } from 'connected-react-router';

interface AppPageHeaderProps {
    activeRoute?: Route;
    breadcrumb?: BreadCrumbRoute[];
    user?: User;
    goBack?: typeof goBack;
}

const BreadCrumbRenderer = (route: BreadCrumbRoute) => (
    <Link to={route.path}>
        {route.breadcrumbName}
    </Link>
);

function Component({activeRoute, breadcrumb, user, goBack}: AppPageHeaderProps) {
    let headerLinks: any[] = [];
    if (activeRoute?.data?.headerLinks) {
        const rawHeaderLinks = Array.isArray(activeRoute.data.headerLinks)
            ? activeRoute.data.headerLinks
            : [activeRoute.data.headerLinks];

        headerLinks = rawHeaderLinks.map(headerLink => (
            <Link to={headerLink.navigateTo}
                  key={headerLink.navigateTo}
                  className={'ant-btn ant-btn-' + (headerLink.type || 'primary')}
            >{headerLink.title}</Link>
        ));
    }

    return user ? (
        <PageHeader
            onBack={goBack}
            title={activeRoute?.data?.title}
            breadcrumb={{
                routes: breadcrumb,
                itemRender: BreadCrumbRenderer
            }}
            extra={headerLinks}
            // subTitle="This is a subtitle"
        />
    ) : null;
}

const mapStateToProps = ({routes, app}: IndexState, ownProps: AppPageHeaderProps) => ({
    activeRoute: routes.routes[routes.activatedRoutes[0] || ''],
    breadcrumb: routes.breadcrumb,
    user: app.user
})

const AppPageHeader = connect(mapStateToProps, {goBack})(Component);

export default AppPageHeader;
