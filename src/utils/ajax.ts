import axios from "axios";
import {message} from "antd";

const instance = axios.create({
    timeout: 10 * 1000, // 超时时间
})

// 响应拦截器
instance.interceptors.response.use(
    response => {
        const resData = (response.data || {}) as ResponseType;
        const { code, data = {}, msg } = resData;
        if (code !== 200) {
            if (msg) {
                message.error(msg)
            }
            // throw new Error(msg)
        }
        return data as any;
    }
)


export default instance;

export type ResponseType = {
    code: number,
    data?: ResponseDataType,
    msg?: string
}

export type ResponseDataType = {
    [key: string]: any
}