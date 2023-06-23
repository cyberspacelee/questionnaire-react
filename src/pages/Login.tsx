import React, {FC, useEffect} from 'react'
import {Button, Checkbox, Form, Input, Space, Typography} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import styles from './Register.module.scss'
import {Link} from "react-router-dom";
import {LOGIN_PATH, REGISTER_PATH} from "../router";
import {useNavigate} from "react-router-dom";


const {Title} = Typography

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
}

function deleteRememberUser() {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}

function getRememberUser() {
    const username = localStorage.getItem(USERNAME_KEY)
    const password = localStorage.getItem(PASSWORD_KEY)
    if (username && password) {
        return {username, password}
    }
    return null
}

const Login: FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    useEffect(() => {
        const {username, password} = getRememberUser() || {}
        form.setFieldsValue({username, password, rememberMe: true})
    }, [])

    function onFinish(values: any) {
        console.log('Success:', values);
        const {username, password, rememberMe} = values || {}
        if (values.rememberMe) {
            console.log('rememberMe')
            rememberUser(username, password)
        } else {
            deleteRememberUser()
            console.log('not rememberMe')
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined/></Title>
                    <Title level={2}>Login</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span: 10}}
                      wrapperCol={{span: 16}}
                      style={{maxWidth: 800}}
                      onFinish={onFinish}
                      initialValues={{rememberMe: true}}
                      form={form}
                >
                    <Form.Item label='Username' name='username'
                               rules={[{required: true, message: 'Please input your username!'}, {
                                   type: 'string',
                                   min: 6,
                                   max: 15,
                                   message: 'Username must be between 6 and 15 characters'
                               }, {
                                   pattern: /^[a-zA-Z0-9_]+$/,
                                   message: 'Username can only be composed of letters, numbers and underscores'
                               }]}>
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'
                               rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password allowClear/>
                    </Form.Item>
                    <Form.Item name='rememberMe' valuePropName='checked' wrapperCol={{offset: 10, span: 16}}>
                        <Checkbox>RememberMe</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 10, span: 16}}>
                        <Space>
                            <Button type='primary' htmlType='submit'>login</Button>
                            <Link to={REGISTER_PATH} style={{marginLeft: 20}}>register</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login
