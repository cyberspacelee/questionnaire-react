import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {getQuestionListService, getQuestionService} from "../api/question";
import {useRequest} from "ahooks";
import {LIST_SEARCH_PARAM_KEY} from "../constants";

type OptionType = {
    isStar: boolean,
    isDeleted: boolean,
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
    const {isStar = false, isDeleted = false} = opt
    const [searchParam] = useSearchParams()
    const {data, loading, error} = useRequest(
        async () => {
            const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || ''
            return await getQuestionListService({keyword, isStar, isDeleted})
        }, {
            refreshDeps: [searchParam]
        }
    )

    return {loading, data, error}
}

export default useLoadQuestionListData