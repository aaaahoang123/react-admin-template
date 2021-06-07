import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthUser} from '../../features/auth/selectors';
import {Avatar, Button, Dropdown, Menu, Layout} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {RouterEnum} from '../../common/enums';
import LogoutManager from '../../core/auth/logout-manager';
import {useSidebarCollapse, useTriggerSidebarCollapsed} from './collapse';
import {authLoadUserData} from '../../features/auth/reducer';

const {Header: AntdHeader} = Layout;

function HeaderAction() {
    const user = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    if (!user) {
        dispatch(authLoadUserData());
    }

    const logout = useCallback(() => {
        LogoutManager.logout();
    }, []);

    const menuRender = (
        <Menu>
            <Menu.Item>
                <Link to={`${RouterEnum.edit}/${user?.id}`}>
                    {user?.username}
                </Link>
            </Menu.Item>
            <Menu.Item>
                {/*eslint-disable-next-line*/}
                <a onClick={logout}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {
                user
                    ? (
                        <div className="float-right ml-3 mr-4 transition-none h-16">
                            <Dropdown overlay={menuRender} placement="bottomRight" trigger={['hover']}>
                                <Button className="inline-block border-none h-full py-0 cursor-pointer transition-all">
                                    <Avatar icon={<UserOutlined/>} src={''} size={'small'} className={'mr-2'}/> {user?.username ?? 'Tài khoản'}
                                </Button>
                            </Dropdown>
                        </div>
                    )
                    : null
            }
        </>
    );
}

const Header = memo(() => {
    const isCollapsed = useSidebarCollapse();

    const triggerCollapse = useTriggerSidebarCollapsed();
    return (
        <AntdHeader className="p-0 w-full z-20 h-16 bg-white">
            <div className="relative h-16 p-0 bg-white shadow">
                {
                    isCollapsed
                        ? <MenuUnfoldOutlined className={'px-4 cursor-pointer transition-all text-xl'} onClick={triggerCollapse}/>
                        : <MenuFoldOutlined className={'px-4 cursor-pointer transition-all text-xl'} onClick={triggerCollapse}/>
                }
                <HeaderAction />
            </div>
        </AntdHeader>
    )
})

export default Header;
