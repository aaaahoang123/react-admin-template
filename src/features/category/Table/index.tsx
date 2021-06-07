import React, {memo, useMemo} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
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
import {CategoryType} from '../../../models/enums/category-type';
import { Translation } from 'react-i18next';
import CategoryTableSearchBar from './SearchBar';

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
        title: 'Loại danh mục',
        dataIndex: 'type',
        key: 'type',
        render: (type: CategoryType) => <Translation>{t => t(`enums:CategoryType.${CategoryType[type]}`)}</Translation>
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

const TableRender = memo(({parentId}: CategoryTableProps) => {
    const selector = useMemo(() =>
        parentId ? selectListChildrenCategories(parentId) : selectListParentCategories,
        [parentId]
    );
    const dataSource = useSelector(selector, shallowEqual);
    const parentIds = useSelector(selectListParentIds, shallowEqual);
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
                expandedRowRender: record => <TableRender parentId={record.id}/>,
                rowExpandable: record => parentIds.includes(record.id)
            }}
        />
    );
});

function CategoryTable() {
    return (
        <>
            <CategoryTableSearchBar />
            <TableRender />
        </>
    )
}

export default CategoryTable;
