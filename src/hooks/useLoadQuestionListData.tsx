import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {getQuestionListService, getQuestionService} from "../api/question";
import {useRequest} from "ahooks";
import {
    LIST_SEARCH_DEFAULT_PAGE_SIZE,
    LIST_SEARCH_PAGE_INDEX_KEY,
    LIST_SEARCH_PAGE_SIZE_KEY,
    LIST_SEARCH_PARAM_KEY
} from "../constants";

type OptionType = {
    isStar: boolean,
    isDeleted: boolean,
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
    const {isStar = false, isDeleted = false} = opt
    const [searchParams] = useSearchParams()
    const {data, loading, error} = useRequest(
        async () => {
            const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
            const pageIndex = parseInt(searchParams.get(LIST_SEARCH_PAGE_INDEX_KEY) || '1')
            const pageSize = parseInt(searchParams.get(LIST_SEARCH_PAGE_SIZE_KEY) || `${LIST_SEARCH_DEFAULT_PAGE_SIZE}`)

            return await getQuestionListService({keyword, isStar, isDeleted, pageIndex, pageSize})
        }, {
            refreshDeps: [searchParams]
        }
    )

    return {loading, data, error}
}

export default useLoadQuestionListData