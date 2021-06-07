import {useSelector} from 'react-redux';
import {selectSingleCategory} from '../selectors';
import React from 'react';
import { Link } from 'react-router-dom';
import {RouterEnum} from '../../../common/enums';

interface CategoryLabelProps {
    categoryId: number;
}

const CategoryLabel = ({categoryId}: CategoryLabelProps) => {
    const category = useSelector(selectSingleCategory(categoryId));

    return (
        <Link to={`${RouterEnum.categories}${RouterEnum.edit}/${category?.id}`}>
            {category?.name}
        </Link>
    );
};

export default CategoryLabel;
