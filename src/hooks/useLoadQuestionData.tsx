import React from "react";
import {useParams} from "react-router-dom";
import {getQuestionService} from "../api/question";
import {useRequest} from "ahooks";

function useLoadQuestionData() {
    const {id = ''} = useParams()
    async function loadData() {
        return await getQuestionService(id)
    }

    const {loading, data, error} = useRequest(loadData)

    return {loading, data}
}

export default useLoadQuestionData