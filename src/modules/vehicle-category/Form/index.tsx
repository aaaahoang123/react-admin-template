import React from 'react';
import {Button, Card, Col, Form, Input, Row} from 'antd';

const VehicleCategoryForm = (props: any) => {
    return (
        <Card bordered={false}>
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14}>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={10}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Tên nhóm xe"
                                    name="name"
                                    rules={[{ required: true, message: 'Mã bảo mật không được để trống' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Số chỗ ngồi"
                                    name="seat_quantity"
                                    rules={[{ required: true, message: 'Mã bảo mật không được để trống' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

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

export default VehicleCategoryForm;
