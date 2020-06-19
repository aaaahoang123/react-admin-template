import React, {useEffect} from 'react';
import {Form, Input, Button, Card, Row, Col} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {mainLogin} from '../reducer';
import {IndexState} from '../../../core/index.state';
import {LoginFormData} from './form-data';
import { LockOutlined, SendOutlined, PhoneOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router';

function Login() {
    const {requesting, authenticated} = useSelector(({main, app}: IndexState) => ({
        requesting: main.requesting,
        authenticated: app.authenticated
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (authenticated) {
            history.push('/dashboard');
        }
    }, [history, authenticated])

    const onFinish = (values: any) => {
        dispatch(mainLogin(values));
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
                            name="phone_number"
                            rules={[{ required: true, message: 'Email không được để trống' }]}
                        >
                            <Input  prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    placeholder="Số điện thoại"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Password không được để trống' },
                                {min: 6, max: 50, message: 'Mật khẩu phải có từ 6 - 50 ký tự'}
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="Mật khẩu"
                            />
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

export default Login;
