import {Form, Input, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import AppState from '../../../App.state';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { authLogin } from '../reducer';

function Login() {
    const [form] = Form.useForm();
    const loading = useSelector((state: AppState) => state.auth.loginFormLoading);
    const dispatch = useDispatch();

    const onFinish = () => {
        dispatch(authLogin(form.getFieldsValue()));
    };

    return (
        <>
            <h2>Đăng nhập</h2>
            <Form
                name="normal_login"
                className="max-w-6xl"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Hãy nhập tên tài khoản' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên tài khoản" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full">
                        Xác thực
                    </Button>
                    {/*Hoặc <a href={DOMAIN + '/authentication'}>Đăng nhập lại</a>*/}
                </Form.Item>
            </Form>
        </>

    )
}

export default Login;
