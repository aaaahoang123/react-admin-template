import React, {useEffect} from 'react';
import {IndexState} from '../../../core/index.state';
import {connect} from 'react-redux';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import { Badge, Card, Table } from 'antd';
import {vehicleCategoriesListRefresh} from '../actions';
import {CommonStatus} from '../../../common/enums/common-status.enum';
import {ColumnProps} from 'antd/es/table';
import {LoadingOutlined} from '@ant-design/icons';
import TableAction from './TableAction';

interface VehicleCategoriesListProps {
    categories?: VehicleCategory[];
    vehicleCategoriesListRefresh: typeof vehicleCategoriesListRefresh;
}

const columns: ColumnProps<VehicleCategory>[]  = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        // render: text => <a>{text}</a>,
    },
    {
        title: 'Tên nhóm xe',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số chỗ ngồi',
        dataIndex: 'seat_quantity',
        key: 'seat_quantity',
    },
    {
        title: 'Số xe',
        key: 'vehicles_count',
        dataIndex: 'vehicles_count'
    },
    {
        title: 'Số loại vé',
        key: 'tickets_count',
        dataIndex: 'tickets_count'
    },
    {
        title: 'Trạng thái',
        key: 'status',
        render: (text: any, record: VehicleCategory) =>
            <Badge status={record.status === CommonStatus.ACTIVE ? 'success' : 'error'} text={record.status_title} />,
    },
    {
        title: 'Trạng thái',
        key: 'status',
        render: (text: any, record: VehicleCategory) => record.isDeleting
            ? <LoadingOutlined />
            : <TableAction vehicleCategoryId={record.id} />,
    },
];

const Component = ({categories, vehicleCategoriesListRefresh}: VehicleCategoriesListProps) => {
    useEffect(() => {
        vehicleCategoriesListRefresh();
        // eslint-disable-next-line
    }, []);

    return (
        <Card>
            <Table
                columns={columns}
                dataSource={categories}
                pagination={false}
                scroll={{x: 800}}
                size={'small'}
                rowKey={'id'}
            />
        </Card>
    )
};

const mapStateToProps = ({vehicleCategory}: IndexState) => ({
    categories: Object.values(vehicleCategory.list.items)
});

const VehicleCategoriesList = connect(mapStateToProps, {vehicleCategoriesListRefresh})(Component);

export default VehicleCategoriesList;
