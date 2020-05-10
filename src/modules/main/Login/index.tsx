import React from 'react';
import {Form, Input, Button, Card, Row, Col} from 'antd';
import {connect} from 'react-redux';
import {mainLogin} from '../actions';
import {useQuery} from '../../../utils/use-query';
import {logout} from '../../../utils/logout';
import {IndexState} from '../../../core/index.state';

interface LoginProps {
    appLogin: typeof mainLogin;
    requesting: boolean;
}

function Login({appLogin, requesting}: LoginProps) {
    const query = useQuery();
    const hashedToken = query.get('hashed_token') || '';
    if (!hashedToken) {
        logout();
    }
    const onFinish = (values: any) => {
        appLogin(hashedToken, values.secret)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card bordered={false}>
            {/*ant-col ant-col-xs-24 ant-col-sm-22 ant-col-md-20 ant-col-lg-16 ant-col-xl-14 ant-col-xxl-14*/}
            <Row justify="center">
                <Col xs={24} sm={22} md={20} lg={16} xl={14} xxl={14}>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Mã bảo mật"
                            name="secret"
                            rules={[{ required: true, message: 'Mã bảo mật không được để trống' }]}
                        >
                            <Input />
                        </Form.Item>

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
                            <Button type="primary" htmlType="submit" loading={requesting}>
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
