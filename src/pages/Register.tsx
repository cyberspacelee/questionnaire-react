import React, {FC} from 'react'
import {Button, Form, Input, Space, Typography} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import styles from './Register.module.scss'
import {Link} from "react-router-dom";
import {LOGIN_PATH} from "../router";


const {Title} = Typography

const Register: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined/></Title>
                    <Title level={2}>Register</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span: 10}}
                      wrapperCol={{span: 16}}
                      style={{maxWidth: 800}}
                      onFinish={onFinish}
                >
                    <Form.Item
                        label="Nickname"
                        name="nickname"
                        rules={[{required: true, message: 'Please input your nickname!'}]}
                    >
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}, {
                            type: 'string',
                            min: 6,
                            max: 15,
                            message: 'Username must be between 6 and 15 characters'
                        }, {
                            pattern: /^[a-zA-Z0-9_]+$/,
                            message: 'Username can only be composed of letters, numbers and underscores'
                        }]}
                    >
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="Password" name="password"
                               rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password allowClear/>
                    </Form.Item>
                    <Form.Item label="ConfirmPassword" name="confirmPassword" dependencies={['password']}
                               rules={[{required: true, message: 'Please input your password!'},
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                       },
                                   }),
                               ]}>
                        <Input.Password allowClear/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 10, span: 16}}>
                        <Space>
                            <Button type='primary' htmlType='submit'>register</Button>
                            <Link to={LOGIN_PATH} style={{marginLeft: 20}}>login</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Register
