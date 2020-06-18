import React from 'react';
import {useSelector} from 'react-redux';
import {IndexState} from '../../core/index.state';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';

const {SubMenu, Item} = Menu;

interface SidebarItemProps {
    path: string;
    displayIcon?: boolean;
}

function SubMenuItem({path, displayIcon, ...rest}: SidebarItemProps) {
    const {route} = useSelector(({routes}: IndexState) => ({
        route: routes.routes[path]
    }));

    return route?.data?.display
        ? (
            <Item title={route?.data?.title} {...rest}>
                {displayIcon && route?.data?.icon ? <route.data.icon/> : null}
                <Link to={path}>{route?.data?.title}</Link>
            </Item>
        )
        : null;
}


function SidebarItem({path, ...rest}: SidebarItemProps) {
    const {route, children} = useSelector(({routes}: IndexState) => ({
        route: routes.routes[path],
        children: routes.childrenMapper[path]
    }));
    return route?.data?.display
        ? (
            children?.length
                ? (
                    <SubMenu icon={route.data?.icon ? <route.data.icon/> : null} title={route.data?.title} {...rest}>
                        {
                            children?.map(child => <SubMenuItem path={child} displayIcon={false} key={child}/>)
                        }
                    </SubMenu>
                )
                : (
                    <SubMenuItem path={route?.path || ''} displayIcon={true} {...rest} />
                )
        )
        : null;

}

export default SidebarItem;
