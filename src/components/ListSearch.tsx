import React, {FC, useEffect} from 'react'
import {Input} from "antd";
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constants";


const {Search} = Input;

const ListSearch: FC = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const [value, setValue] = React.useState('');

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        setValue(curVal)
    }, [searchParams])
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function handleSearch(value: string) {
        navigate({
            pathname: pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`
        })
        console.log(value)
    }

    return (
        <>
            <Search placeholder="please input key" onChange={handleChange} value={value} onSearch={handleSearch}
                    style={{width: "400px"}} allowClear/>
        </>
    )
}

export default ListSearch;
