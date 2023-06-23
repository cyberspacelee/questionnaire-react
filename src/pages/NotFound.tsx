import React, {FC} from 'react'
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {HOME_PATH} from "../router";

const NotFound: FC = () => {
    const navigate = useNavigate()
    return (
        <Result
            status="404"
            title="404"
            subTitle="Not Found"
            extra={<Button type="primary" onClick={() => navigate(HOME_PATH)}>
                Back Home
            </Button>}>
        </Result>
    )
}
export default NotFound
