import React, {useEffect} from 'react';
import {Button, Card, Col, Form, Input, InputNumber, Row} from 'antd';
import {IndexState} from '../../../core/index.state';
import {connect} from 'react-redux';
import {vehicleCategoryFormChange, vehicleCategoryFormIdChange, vehicleCategoryFormSubmit} from '../actions';
import {VehicleCategoryFormState} from './state';
import SeatGrid from './parts/SeatGrid';
import {
    SaveOutlined
} from '@ant-design/icons';

interface VehicleCategoryFormProps {
    formData: VehicleCategoryFormState;
    vehicleCategoryFormChange: typeof vehicleCategoryFormChange;
    vehicleCategoryFormIdChange: typeof vehicleCategoryFormIdChange;
    vehicleCategoryFormSubmit: typeof vehicleCategoryFormSubmit;
    categoryId?: number;
}

const VehicleCategoryForm = (
    {
        formData,
        vehicleCategoryFormChange,
        categoryId,
        vehicleCategoryFormIdChange,
        vehicleCategoryFormSubmit
    }: VehicleCategoryFormProps) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(formData);
        // eslint-disable-next-line
    }, [formData.cols, formData.rows]);

    useEffect(() => {
        vehicleCategoryFormIdChange(categoryId);
        // eslint-disable-next-line
    }, []);

    const onFinish = (values: any) => {
        vehicleCategoryFormSubmit(formData);
    };

    return (
        <Card bordered={false}>
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14}>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={formData}
                        onFinish={onFinish}
                        onValuesChange={vehicleCategoryFormChange as any}
                        form={form}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={10}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Tên nhóm xe"
                                    name="name"
                                    rules={[{required: true, message: 'Tên nhóm xe'}]}
                                >
                                    <Input placeholder={'Nhập tên nhóm xe'}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số chỗ ngồi"
                                    name="seat_quantity"
                                    rules={[
                                        {required: true, message: 'Hãy nhập số chỗ ngồi'},
                                        {type: 'number', message: 'Số chỗ ngồi phải là số'}
                                    ]}
                                >
                                    <InputNumber min={1} className={'w-100'} placeholder={'Nhập số chỗ ngồi'}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số dãy"
                                    name="cols"
                                >
                                    <InputNumber min={1}
                                                 max={8}
                                                 placeholder="Nhập số dãy ghế"
                                                 className="w-100"/>
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
                        <SeatGrid/>

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
                            <Button type="primary"
                                    htmlType="submit"
                                    loading={formData.formSubmitting}
                                    icon={<SaveOutlined />}
                            >
                                Lưu
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
        formData: vehicleCategory.form
    };
};

const connected = connect(mapStateToProps, {
    vehicleCategoryFormChange,
    vehicleCategoryFormIdChange,
    vehicleCategoryFormSubmit
})(VehicleCategoryForm);

export default connected;
