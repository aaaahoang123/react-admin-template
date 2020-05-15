import React from 'react';
import {Link} from 'react-router-dom';
import {RouteEnum} from '../../../common/enums/route.enum';
import {Button, Popconfirm, Space} from 'antd';
import {deleteVehicleCategory} from '../actions';
import {VehicleCategory} from '../../../entities/api/vehicle-category';
import {connect} from 'react-redux';
import {IndexState} from '../../../core/index.state';

interface PropsTableAction {
    vehicleCategoryId: number;
    vehicleCategory?: VehicleCategory;
    deleteVehicleCategory?: typeof deleteVehicleCategory;
}

const Component = ({vehicleCategory, vehicleCategoryId, deleteVehicleCategory}: PropsTableAction) => {
    return (
        <Space size="middle">
            <Link to={RouteEnum.vehicle_categories + RouteEnum.edit + '/' + vehicleCategoryId}>Sửa</Link>
            <Popconfirm placement="topRight"
                        title={'Bạn chắc chắn muốn xóa nhóm xe: ' + vehicleCategory?.name + ' chứ?'}
                        onConfirm={() => deleteVehicleCategory?.(vehicleCategoryId)}
                        okText="Ok"
                        cancelText="Hủy">
                <Button type={'link'}>Xóa</Button>
            </Popconfirm>
        </Space>
    )
};

const mapStateToProps = ({vehicleCategory}: IndexState, {vehicleCategoryId}: PropsTableAction) => {
    return {
        vehicleCategory: vehicleCategory.list.items[vehicleCategoryId]
    };
}

const TableAction = connect(mapStateToProps, {deleteVehicleCategory})(Component);

export default TableAction;
