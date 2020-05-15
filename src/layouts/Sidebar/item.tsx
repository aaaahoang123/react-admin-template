import React from 'react';
import {connect} from 'react-redux';
import {IndexState} from '../../core/index.state';
import {Route} from '../../entities/common/route';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';

const {SubMenu, Item} = Menu;

// const RefLink = React.forwardRef((props: any, ref: any) => (
//     <Link ref={ref} to={props.path}>
//         {props.children}
//     </Link>
// ));

interface SidebarItemProps {
    path: string;
    route?: Route;
    displayIcon?: boolean;
    children?: string[]
}

const mapStateToProps = ({routes}: IndexState, {path}: SidebarItemProps) => ({
    route: routes.routes[path],
    children: routes.childrenMapper[path]
});

function item({path, route, displayIcon, ...rest}: SidebarItemProps) {
    return route?.data?.display
        ? (
            <Item title={route?.data?.title} {...rest}>
                {displayIcon && route?.data?.icon ? <route.data.icon/> : null}
                <Link to={path}>{route?.data?.title}</Link>
            </Item>
        )
        : null;
}

const SubMenuItem = connect(mapStateToProps, {})(item);

function Component({path, route, children, ...rest}: SidebarItemProps) {
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

const SidebarItem = connect(mapStateToProps, {})(Component);

export default SidebarItem;
