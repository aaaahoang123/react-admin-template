import React, {useEffect} from 'react';
import {IndexState} from '../../../core/index.state';
import {connect} from 'react-redux';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import {Badge, Card, Space, Table, Button, Popconfirm} from 'antd';
import {deleteVehicleCategory, vehicleCategoriesListRefresh} from '../actions';
import {CommonStatus} from '../../../common/enums/common-status.enum';
import {ColumnProps} from 'antd/es/table';
import {Link} from 'react-router-dom';
import {RouteEnum} from '../../../common/enums/route.enum';
import {LoadingOutlined} from '@ant-design/icons';

interface VehicleCategoriesListProps {
    categories?: VehicleCategory[];
    vehicleCategoriesListRefresh: typeof vehicleCategoriesListRefresh;
    deleteVehicleCategory: typeof deleteVehicleCategory;
}

const Component = ({categories, vehicleCategoriesListRefresh, deleteVehicleCategory}: VehicleCategoriesListProps) => {
    useEffect(() => {
        vehicleCategoriesListRefresh();
        // eslint-disable-next-line
    }, []);

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
            render: (text: any, record: VehicleCategory) => (
                <Badge status={record.status === CommonStatus.ACTIVE ? 'success' : 'error'} text={record.status_title} />
            ),
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text: any, record: VehicleCategory) => record.isDeleting ? (<LoadingOutlined />) : (
                <Space size="middle">
                    <Link to={RouteEnum.vehicle_categories + RouteEnum.edit + '/' + record.id}>Sửa</Link>
                    <Popconfirm placement="topRight"
                                title={'Bạn chắc chắn muốn xóa nhóm xe: ' + record.name + ' chứ?'}
                                onConfirm={() => deleteVehicleCategory(record.id)}
                                okText="Ok"
                                cancelText="Hủy">
                        <Button type={'link'}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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

const VehicleCategoriesList = connect(mapStateToProps, {vehicleCategoriesListRefresh, deleteVehicleCategory})(Component);

export default VehicleCategoriesList;
