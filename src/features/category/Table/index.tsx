import React, {memo, useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
    selectListParentCategories,
    selectListChildrenCategories,
    selectListParentIds
} from '../selectors';
import {Table} from 'antd';
import {ColumnProps} from 'antd/es/table';
import {CommonStatus} from '../../../common/enums';
import CommonStatusLabel from '../../../common/components/CommonStatusLabel';
import CategoryTableActionButtons from './ActionButtons';
import {Category} from '../../../models/category';
import { refreshListCategories } from '../reducer';

interface CategoryTableProps {
    parentId?: number;
}

const columns: ColumnProps<Category>[] = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục cha',
        dataIndex: 'parent_id',
        key: 'parent_id',
    },
    {
        title: 'Mức ưu tiên',
        key: 'sort_number',
        dataIndex: 'sort_number'
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status: CommonStatus) => (<CommonStatusLabel status={status}/>),
    },

    {
        title: 'Thao tác',
        key: 'id',
        dataIndex: 'id',
        render: (id: number) => (<CategoryTableActionButtons itemId={id}/>),
    },
];

const CategoryTable = memo(({parentId}: CategoryTableProps) => {
    const selector = useMemo(() =>
        parentId ? selectListChildrenCategories(parentId) : selectListParentCategories,
        [parentId]
    );
    const dataSource = useSelector(selector, shallowEqual);
    const parentIds = useSelector(selectListParentIds, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshListCategories())
    }, [dispatch]);
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="small"
            rowKey={'id'}
            className="w-100"
            scroll={{x: '800px'}}
            bordered={false}
            expandable={{
                expandedRowRender: record => <CategoryTable parentId={record.id}/>,
                rowExpandable: record => parentIds.includes(record.id)
            }}
        />
    );
});

export default CategoryTable;
