import axios, {ResponseDataType} from '../utils/ajax';

// 获取单个问卷
export async function getQuestionService(id: String): Promise<ResponseDataType> {
    const url = `/api/question/${id}`;
    return await axios.get<ResponseDataType>(url);
}

// 创建问卷
export async function createQuestionService(): Promise<ResponseDataType> {
    const url = `/api/question`;
    return await axios.post<ResponseDataType>(url);
}

type SearchParam = {
    keyword: string,
    isStar: boolean,
    isDeleted: boolean,
    pageSize: number,
    pageIndex: number,
}

// 获取所有问卷
export async function getQuestionListService(searchParams: Partial<SearchParam>): Promise<ResponseDataType> {
    const url = `/api/question`;
    return await axios.get<ResponseDataType>(url, {params: searchParams});
}