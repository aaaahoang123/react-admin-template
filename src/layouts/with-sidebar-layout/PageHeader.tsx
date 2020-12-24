import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, PageHeader} from 'antd';
import { useHistory, useLocation, matchPath, Link } from 'react-router-dom';
import {NavigateButton, RouteConfig, Routes} from '../../core/router';
import {Dictionary} from '@reduxjs/toolkit';
import {PlusOutlined} from '@ant-design/icons';

export interface PageHeaderProps {
    routes: Routes;
}

const reduceToSource = (routes: Routes, source: Dictionary<RouteConfig>) => {
    routes.forEach(route => {
        source[route.path] = route;
        if (route.children) {
            reduceToSource(route.children, source);
        }
    });
    return source;
}

const useMapRoutes = (routes: Routes): Dictionary<RouteConfig> => {
    return useMemo(() => {
        return reduceToSource(routes, {});
    }, [routes]);
};

function AppPageHeader({routes}: PageHeaderProps) {
    const history = useHistory();
    const goBack = useCallback(() => history.goBack(), [history]);
    const {pathname} = useLocation();
    const mapRoutes = useMapRoutes(routes);
    const [title, setTitle] = useState<string>('');
    const [buttons, setButtons] = useState<NavigateButton[]>([]);

    useEffect(() => {
        const path = Object.keys(mapRoutes).find(rawPath => !!matchPath(pathname, {path: rawPath, exact: true}));
        const route = path && mapRoutes[path];

        if (route) {
            document.title = route.data?.title || 'No title';
            setTitle(route.data?.title || 'No title');
            if (!!route.data?.navigateButtons) {
                setButtons(Array.isArray(route.data.navigateButtons) ? route.data.navigateButtons : [route.data.navigateButtons])
            } else {
                setButtons([]);
            }
        }
    }, [pathname, mapRoutes]);

    return (
        <PageHeader
            className="site-page-header"
            onBack={goBack}
            title={title}
            extra={
                buttons.map((button, index) =>
                    <Button type={button.type || 'primary'} key={index} className={'mr-1'}>
                        <Link to={button.navigate}>
                            {button.icon ? <button.icon /> : <PlusOutlined />} {button.title}
                        </Link>
                    </Button>
                )
            }
        />
    )
}

export default AppPageHeader;
