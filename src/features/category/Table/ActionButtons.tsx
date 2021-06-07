import React, {memo} from 'react';
import {Button, Popconfirm, Space} from 'antd';
import {RouterEnum} from '../../../common/enums';
import { Link } from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import { selectSingleCategory } from '../selectors';
import { deleteCategory } from '../reducer';

interface CategoryTableActionButtonsProps {
    itemId: number;
}

const CategoryTableActionButtons = memo(({itemId}: CategoryTableActionButtonsProps) => {
    const category = useSelector(selectSingleCategory(itemId), shallowEqual);
    const editLink = `${RouterEnum.categories}${RouterEnum.edit}/${category?.id}`;

    const dispatch = useDispatch();
    const doDelete = () => {
        dispatch(deleteCategory(itemId));
    };

    const viewRender = (
        <Space size={'small'}>
            <Link to={editLink}>Sửa</Link>
            <Popconfirm title={`Bạn chắc chắn muốn xóa xe: ${category?.name} chứ?`}
                        onConfirm={doDelete}
                        placement={'topRight'}>
                <Button type={'link'} className={'color-danger'}>
                    Xóa
                </Button>
            </Popconfirm>
        </Space>
    )

    return (
        <>
            {
                !category?.is_system
                    ? viewRender
                    : null
            }
        </>
    );
});

export default CategoryTableActionButtons;
