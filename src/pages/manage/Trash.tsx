import React, {FC, useState} from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import {useTitle} from "ahooks";
import {Button, Modal, Space, Spin, Table, Tag, Typography} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const {Title} = Typography

const Trash: FC = () => {
    useTitle('questionnaire trash')
    const {confirm} = Modal;

    const {data = {}, loading} = useLoadQuestionListData({isDeleted: true})
    const {list: questionList = [], total = 0} = data

    const tableColumns = [
        {
            title: 'title',
            dataIndex: 'title',
            // key: 'title', 循环列的 key，默认取 dataIndex 的值
        },
        {
            title: 'isPublished',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => isPublished ? <Tag color="processing">published</Tag> :
                <Tag>unpublished</Tag>
        },
        {
            title: 'answerCount',
            dataIndex: 'answerCount',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
        }
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

    function deleteQuestion() {
        confirm({
            title: 'Are you sure to delete these questionnaires?',
            icon: <ExclamationCircleOutlined/>,
            content: "You can't undo this operation.",
            onOk: () => console.log(JSON.stringify(selectedRowKeys))
        })
    }

    const TableElement = (
        <>
            <div style={{marginBottom: "16px"}}>
                <Space>
                    <Button type="primary" disabled={selectedRowKeys.length === 0}>
                        restore
                    </Button>
                    <Button danger disabled={selectedRowKeys.length === 0} onClick={deleteQuestion}>
                        delete
                    </Button>
                </Space>
            </div>
            <Table dataSource={questionList} columns={tableColumns} pagination={false} rowKey={q => q._id}
                   rowSelection={
                       {
                           type: 'checkbox',
                           onChange: (selectedRowKeys) => {
                               setSelectedRowKeys(selectedRowKeys as string[])
                           }
                       }
                   }/>
        </>
    )

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>questionnaire trash</Title>
                </div>
                <div className={styles.right}><ListSearch/></div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{textAlign: 'center'}}>
                        <Spin/>
                    </div>
                )}
                {!loading && questionList.length === 0 && <div className={styles.empty}>no questionnaire</div>}
                {!loading && questionList.length > 0 && TableElement}
            </div>
            <div className={styles.footer}><ListPage total={total}/></div>
        </>
    )
}
export default Trash
