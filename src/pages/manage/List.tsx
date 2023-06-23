import React, {FC, useState} from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import {useTitle} from "ahooks";
import {Spin, Typography} from "antd";
import ListSearch from "../../components/ListSearch";
import {getQuestionListService} from "../../api/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const {Title} = Typography
const rawQuestionList = [
    {
        _id: 'q1',
        title: 'Questionnaire1',
        isStared: true,
        isPublished: true,
        answerCount: 10,
        createdAt: '2023-01-01',
    },
    {
        _id: 'q2',
        title: 'Questionnaire2',
        isStared: false,
        isPublished: false,
        answerCount: 20,
        createdAt: '2023-01-02',
    },
    {
        _id: 'q3',
        title: 'Questionnaire3',
        isStared: true,
        isPublished: true,
        answerCount: 3,
        createdAt: '2023-01-01',
    },
    {
        _id: 'q4',
        title: 'Questionnaire4',
        isStared: false,
        isPublished: true,
        answerCount: 10,
        createdAt: '2023-01-01',
    },
    {
        _id: 'q5',
        title: 'Questionnaire5',
        isStared: false,
        isPublished: true,
        answerCount: 10,
        createdAt: '2020-01-01',
    },
]

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