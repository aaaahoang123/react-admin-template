import React from 'react';
import {Button, Card, Col, Form, Input, InputNumber, Row} from 'antd';
import SeatGrid from './parts/SeatGrid';
import {IndexState} from '../../../core/index.state';
import {connect} from 'react-redux';
import {FieldData} from 'rc-field-form/lib/interface';
import {seatGridChange} from '../actions';

interface VehicleCategoryFormProps {
    cols?: number;
    rows?: number;
    seatGridChange: typeof seatGridChange;
}

const VehicleCategoryForm = ({cols, rows, seatGridChange}: VehicleCategoryFormProps) => {
    const onFinish = (values: any) => console.log(values);
    const onChange = (changedFields: FieldData[], allFields: FieldData[]) => {
        changedFields.filter(field => {
            return ['cols', 'rows'].includes('cols');
        } )
    };

    return (
        <Card bordered={false}>
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14}>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ cols, rows }}
                        onFinish={onFinish}
                        onFieldsChange={onChange}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={10}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Tên nhóm xe"
                                    name="name"
                                    rules={[{ required: true, message: 'Tên nhóm xe' }]}
                                >
                                    <Input placeholder={'Nhập tên nhóm xe'} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số chỗ ngồi"
                                    name="seat_quantity"
                                    rules={[
                                        { required: true, message: 'Hãy nhập số chỗ ngồi' },
                                        { type: 'number', message: 'Số chỗ ngồi phải là số'}
                                    ]}
                                >
                                    <InputNumber min={1} className={'w-100'} placeholder={'Nhập số chỗ ngồi'} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số dãy"
                                    name="cols"
                                >
                                    <InputNumber min={1}
                                                 placeholder="Nhập số dãy ghế"
                                                 className="w-100" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số hàng"
                                    name="rows"
                                >
                                    <InputNumber min={1}
                                                 placeholder="Nhập số hàng ghế"
                                                 className="w-100"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*<SeatGrid />*/}

                        {/*<Form.Item*/}
                        {/*    label="Password"*/}
                        {/*    name="password"*/}
                        {/*    rules={[{ required: true, message: 'Please input your password!' }]}*/}
                        {/*>*/}
                        {/*    <Input.Password />*/}
                        {/*</Form.Item>*/}

                        {/*<Form.Item name="remember" valuePropName="checked">*/}
                        {/*    <Checkbox>Remember me</Checkbox>*/}
                        {/*</Form.Item>*/}

                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                    // loading={requesting}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
};

const mapStateToProps = ({vehicleCategory}: IndexState) => {
    return {
        cols: vehicleCategory.form.cols,
        rows: vehicleCategory.form.rows
    };
};

const connected = connect(mapStateToProps, {seatGridChange})(VehicleCategoryForm);

export default connected;
