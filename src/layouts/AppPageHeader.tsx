import { useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {PageHeader} from 'antd';
import {IndexState} from '../core/index.state';
import {Route as BreadCrumbRoute} from 'antd/lib/breadcrumb/Breadcrumb';
import {Link} from 'react-router-dom';
import { goBack } from 'connected-react-router';

const BreadCrumbRenderer = (route: BreadCrumbRoute) => (
    <Link to={route.path}>
        {route.breadcrumbName}
    </Link>
);

function AppPageHeader() {
    const {activeRoute, breadcrumb, authenticated} = useSelector(({routes, app}: IndexState) => ({
        activeRoute: routes.routes[routes.activatedRoutes[0] || ''],
        breadcrumb: routes.breadcrumb,
        authenticated: app.authenticated
    }));

    const dispatch = useDispatch();

    const back = () => dispatch(goBack());

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

    return authenticated ? (
        <PageHeader
            onBack={back}
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

export default AppPageHeader;
