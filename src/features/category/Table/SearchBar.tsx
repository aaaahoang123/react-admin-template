import React, {KeyboardEvent, memo, useEffect} from 'react';
import {useSyncRouterQueryForm} from '../../../common/hooks';
import {categoryParamsChange, refreshListCategories} from '../reducer';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {selectCategoryListLoading, selectCategoryParams} from '../selectors';
import {Col, Form, Row, Input} from 'antd';
import EnumSelector from '../../../common/components/EnumSelector';
import {CategoryType} from '../../../models/enums/category-type';

const {Search} = Input;
const {Item: FormItem} = Form;

const SearchBox = memo(({onChange}: {onChange?: (changes?: any) => void}) => {
    const listLoading = useSelector(selectCategoryListLoading);

    const onKeyUp = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onChange?.();
        }
    }

    return (
        <FormItem name="search">
            <Search placeholder="Tìm kiếm"
                    loading={listLoading}
                    onKeyUp={onKeyUp}
            />
        </FormItem>
    )
});

const ignoreSync = ['search'];

const CategoryTableSearchBar = () => {
    const params = useSelector(selectCategoryParams, shallowEqual);
    const [form, formChange] = useSyncRouterQueryForm(params, categoryParamsChange, ignoreSync);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshListCategories());
    }, [dispatch]);

    return (
        <Form form={form}
              initialValues={params}
              // onValuesChange={formChange}
              onFinish={formChange}
        >
            <Row gutter={6} className="mb-5 mt-5">
                <Col lg={6} md={12} sm={24} className="mb-2">
                    <SearchBox onChange={formChange} />
                </Col>

                <Col lg={6} md={12} sm={24} className="mb-2">
                    <FormItem name="type">
                        <EnumSelector enumObj={CategoryType}
                                      enumName="CategoryType"
                                      allowClear
                                      placeholder={'Loại danh mục'}
                        />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    );
};

export default CategoryTableSearchBar;
