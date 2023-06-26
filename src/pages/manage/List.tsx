import React, {FC, useEffect, useRef, useState} from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import {useDebounceFn, useRequest, useTitle} from "ahooks";
import {Spin, Typography} from "antd";
import ListSearch from "../../components/ListSearch";
import {getQuestionListService} from "../../api/question";
import {useSearchParams} from "react-router-dom";
import {LIST_SEARCH_DEFAULT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY} from "../../constants";

const {Title} = Typography

const List: FC = () => {
    useTitle('my questionnaire')
    const [questionList, setQuestionList] = useState([])
    const [total, setTotal] = useState(0)
    const [pageIndex, setPageIndex] = useState(1)

    const haveMore = total > questionList.length

    const [searchParams] = useSearchParams();

    const containerRef = useRef<HTMLDivElement>(null)

    const {run: load, loading} = useRequest(async () => {
        return await getQuestionListService({
            pageIndex,
            pageSize: LIST_SEARCH_DEFAULT_PAGE_SIZE,
            keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
        })
    }, {
        manual: true,
        onSuccess(result) {
            const {list: resultList = [], total = 0} = result
            setQuestionList(questionList.concat(resultList))
            setTotal(total)
            setPageIndex(pageIndex + 1)
        },
    })

    const {run: tryLoadMore} = useDebounceFn(() => {
        const element = containerRef.current
        if (element == null) {
            return
        }
        const domRect = element.getBoundingClientRect()
        if (domRect == null) {
            return
        }
        const bottom = domRect.bottom

        // 底部完全漏出来时，加载更多
        if (bottom <= document.body.clientHeight) {
            load()
        }
    }, {
        wait: 1000,
    })

    // 加载列表数据
    useEffect(() => {
        tryLoadMore()
    }, [searchParams])

    // 页面滚动时，触发加载更多
    useEffect(() => {
        if (haveMore) {
            window.addEventListener('scroll', tryLoadMore) // 组件挂载时，添加事件监听，防抖

        }
        return () => {
            window.removeEventListener('scroll', tryLoadMore) // 组件卸载时，移除事件监听
        }
    }, [searchParams, haveMore])

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
            <div className={styles.footer}>
                <div ref={containerRef}>
                    load more
                </div>
            </div>
        </>
    )
}

export default List