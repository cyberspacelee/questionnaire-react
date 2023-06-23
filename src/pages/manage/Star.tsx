import React, {FC, useState} from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import {Spin, Typography} from "antd";
import {useTitle} from "ahooks";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const {Title} = Typography


const Star: FC = () => {
    useTitle('star questionnaire')
    const {data = {}, loading} = useLoadQuestionListData({isStar: true})
    const {list: questionList = [], total = 0} = data

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>star questionnaire</Title>
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
                {!loading && questionList.length > 0 && questionList.map((q: any) => {
                    const {_id} = q
                    return <QuestionCard key={_id} {...q} />
                })}
            </div>
            <div className={styles.footer}>pageInfo</div>
        </>
    )
}
export default Star
