import React, {FC} from 'react'
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";


const Edit: FC = () => {
    const {loading, data} = useLoadQuestionData()
    return (
        <>
            <div>Edit</div>
            {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
        </>
    )
}
export default Edit
