import React, {FC} from 'react'
import styles from './QuestionCard.module.scss'
import {Button, Divider, Popconfirm, Space, Tag, Modal} from "antd";
import {CopyOutlined, DeleteOutlined, EditOutlined, LineChartOutlined, StarOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";

type PropsType = {
    _id: string
    title: string
    isStared: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const {_id, title, createdAt, answerCount, isPublished, isStared} = props;
    const navigate = useNavigate()
    const {confirm} = Modal;

    function duplicateQuestion() {
        console.log('duplicateQuestion')
    }

    function deleteQuestion() {
        confirm(({
            title: 'Are you sure to delete this questionnaire?',
            icon: <DeleteOutlined/>,
            content: 'This operation cannot be undone',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('deleteQuestion')
            },
            onCancel() {
                console.log('Cancel');
            },
        }))
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.left}>
                        <Link to={isPublished ? `/question/statistics/${_id}` : `/question/edit/${_id}`}>
                            <Space>
                                {isStared && <StarOutlined style={{color: 'red'}}/>}
                                {title}
                            </Space>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <Space>
                            {isPublished ? <Tag color="processing">published</Tag> : <Tag>unpublished</Tag>}
                            <span>count: {answerCount}</span>
                            <span>{createdAt}</span>
                        </Space>
                    </div>
                </div>
                <Divider style={{margin: "12px"}}/>
                <div className={styles.buttonContainer}>
                    <div className={styles.left}>
                        <Space>
                            <Button icon={<EditOutlined/>} type="text" size="small"
                                    onClick={() => navigate(`/question/edit/${_id}`)}
                            >edit</Button>
                            <Button icon={<LineChartOutlined/>} type="text" size="small"
                                    onClick={() => navigate(`/question/statistics/${_id}`)}
                                    disabled={!isPublished}
                            >statistics</Button>
                        </Space>
                    </div>
                    <div className={styles.right}>
                        <Space>
                            <Button type="text" icon={<StarOutlined/>}
                                    size="small">{isPublished ? "unStar" : "star"}</Button>
                            <Popconfirm title="Are you sure to copy this questionnaire?" okText="Yes" cancelText="No"
                                        onConfirm={duplicateQuestion}>
                                <Button type="text" icon={<CopyOutlined/>} size="small">copy</Button>
                            </Popconfirm>
                            <Button type="text" icon={<DeleteOutlined/>} size="small"
                                    onClick={deleteQuestion}>delete</Button>
                        </Space>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionCard