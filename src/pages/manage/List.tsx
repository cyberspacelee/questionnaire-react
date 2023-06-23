import React, {FC, useState} from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import {useTitle} from "ahooks";
import {Spin, Typography} from "antd";
import ListSearch from "../../components/ListSearch";
import {getQuestionListService} from "../../api/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const {Title} = Typography

const List: FC = () => {
    useTitle('my questionnaire')
    const {data = {}, loading} = useLoadQuestionListData()
    const {list: questionList = [], total = 0} = data

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>my questionnaire</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{textAlign: 'center'}}>
                        <Spin/>
                    </div>
                )}
                {!loading && questionList.length > 0 && questionList.map((q: any) => {
                    const {_id} = q
                    return <QuestionCard key={_id} {...q} />
                })}
            </div>
            <div className={styles.footer}>Load more...</div>
        </>
    )
}

export default List