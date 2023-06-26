import React, {FC, useEffect} from 'react'
import {Pagination} from "antd";
import {LIST_SEARCH_DEFAULT_PAGE_SIZE, LIST_SEARCH_PAGE_INDEX_KEY, LIST_SEARCH_PAGE_SIZE_KEY} from "../constants";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
    const [pageIndex, setPageIndex] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(LIST_SEARCH_DEFAULT_PAGE_SIZE);
    const {total} = props
    const [searchParams] = useSearchParams();
    useEffect(() => {
            const pageIndex = parseInt(searchParams.get(LIST_SEARCH_PAGE_INDEX_KEY) || '1')
            setPageIndex(pageIndex)
            const pageSize = parseInt(searchParams.get(LIST_SEARCH_PAGE_SIZE_KEY) || `${LIST_SEARCH_DEFAULT_PAGE_SIZE}`)
            setPageSize(pageSize)
        }, [searchParams])

    const navigate = useNavigate()
    const {pathname} = useLocation()
    function handlePageChange(page: number, pageSize: number) {
        searchParams.set(LIST_SEARCH_PAGE_INDEX_KEY,  page.toString())
        searchParams.set(LIST_SEARCH_PAGE_SIZE_KEY , pageSize.toString())
        console.log(searchParams.toString())
        navigate({
            pathname,
            search: searchParams.toString(),
        })
    }

    return (
        <Pagination current={pageIndex} pageSize={pageSize} total={total} onChange={handlePageChange}></Pagination>
    )
}

export default ListPage