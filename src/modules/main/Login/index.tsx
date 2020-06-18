import React from 'react';
import {Form, Input, Button, Card, Row, Col} from 'antd';
import {connect} from 'react-redux';
import {mainLogin} from '../reducer';
import {IndexState} from '../../../core/index.state';
import {LoginFormData} from './form-data';
import {UserOutlined, LockOutlined, SendOutlined} from '@ant-design/icons';

interface LoginProps {
    appLogin: typeof mainLogin;
    requesting: boolean;
}

function Login({appLogin, requesting}: LoginProps) {
    const onFinish = (values: any) => {
        appLogin(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card bordered={false}>
            {/*ant-col ant-col-xs-24 ant-col-sm-22 ant-col-md-20 ant-col-lg-16 ant-col-xl-14 ant-col-xxl-14*/}
            <Row justify="center">
                <Col xs={24} sm={18} md={12} lg={8} xl={8} xxl={8}>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={new LoginFormData()}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Email không được để trống' }]}
                        >
                            <Input  prefix={<UserOutlined className="site-form-item-icon" />}  />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Password không được để trống' },
                                {min: 6, max: 50, message: 'Mật khẩu phải có từ 6 - 50 ký tự'}
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={requesting} icon={<SendOutlined />}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>

    );
}

const mapStateToProps = ({main}: IndexState) => ({
    requesting: main.requesting
});

const connected = connect(mapStateToProps, {appLogin: mainLogin})(Login)

export default connected;
