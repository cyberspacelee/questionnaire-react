import React, {FC} from 'react'
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import styles from './ManageLayout.module.scss'
import {Button, Divider, message, Space} from "antd";
import {BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined} from '@ant-design/icons';
import {createQuestionService} from "../api/question";
import {useRequest} from "ahooks";

const ManageLayout: FC = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {loading, run: handleCreateQuestion} = useRequest(createQuestionService, {
        manual: true,
        onSuccess: (result, params) => {
            navigate(`/question/edit/${result.id}`)
            message.success("create success")
        }
    })

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Space direction="vertical">
                        <Button type="primary" icon={<PlusOutlined/>} onClick={handleCreateQuestion} disabled={loading}>
                            create questionnaire
                        </Button>
                        <Divider style={{borderTop: "transparent"}}/>
                        <Button type={pathname.startsWith("/manage/list") ? "primary" : "text"}
                                icon={<BarsOutlined/>}
                                onClick={() => navigate("/manage/list")}
                        >
                            my questionnaire
                        </Button>
                        <Button type={pathname.startsWith("/manage/star") ? "primary" : "text"} icon={<StarOutlined/>}
                                onClick={() => navigate("/manage/star")}
                        >
                            star questionnaire
                        </Button>
                        <Button type={pathname.startsWith("/manage/trash") ? "primary" : "text"}
                                icon={<DeleteOutlined/>}
                                onClick={() => navigate("/manage/trash")}
                        >
                            delete questionnaire
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default ManageLayout
