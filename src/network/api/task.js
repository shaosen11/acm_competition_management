import {request} from "../request";

export function listTaskByPage(queryParam) {
    return request({
        url: '/task/listByPage',
        method: 'post',
        data: {
            pageNum: queryParam.pageNum,
            pageSize: queryParam.pageSize,
        }
    })
}