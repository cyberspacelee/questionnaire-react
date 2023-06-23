import React, { FC } from 'react'
import {Link} from "react-router-dom";
import {LOGIN_PATH} from "../router";

const UserInfo: FC = () => {
    return (
        <>
            <Link to={LOGIN_PATH}>Login</Link>
        </>
    )
}
export default UserInfo
