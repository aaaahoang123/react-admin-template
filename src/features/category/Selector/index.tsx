import React, {useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {TreeSelect} from 'antd';
import {TreeSelectProps} from 'antd/lib/tree-select';
import {refreshListCategories} from '../reducer';
import { selectListCategoryByType, selectListParentIds } from '../selectors';
import {CategoryType} from '../../../models/enums/category-type';

interface CategorySelectorProps<T> extends TreeSelectProps<T> {
    type?: CategoryType;
}

function CategorySelector({className, placeholder, type, ...props}: CategorySelectorProps<any>) {
    const selector = useMemo(() => selectListCategoryByType(type), [type]);
    const data = useSelector(selector, shallowEqual);
    const parentIds = useSelector(selectListParentIds, shallowEqual);
    const treeData = useMemo(() => data.map(category => ({
        id: category?.id,
        isLeaf: !parentIds.includes(category!.id),
        pId: category?.parent_id,
        title: category?.name,
        value: category?.id

    })), [data, parentIds]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshListCategories());
    }, [dispatch]);

    return (
        <TreeSelect
            treeDataSimpleMode
            // className={'w-100'}
            showSearch
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder={placeholder ?? "Chọn danh mục"}
            treeNodeFilterProp={'title'}
            treeData={treeData}
            className={className || 'w-100'}
            {...props}
        />
    );
}

export default CategorySelector;
