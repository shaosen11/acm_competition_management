import {request} from "../request";

export function searchEsAll(esAllQueryParam) {
    return request({
        url: '/esAll/search',
        method: 'post',
        data: {
            keyword: esAllQueryParam.keyword,
            pageNum: esAllQueryParam.pageNum,
            pageSize: esAllQueryParam.pageSize,
            lastFlag: esAllQueryParam.lastFlag,
            hotFlag: esAllQueryParam.hotFlag,
        }
    })
}

//搜索博客
export function searchHitRsAll(keyword) {
    return request({
        url: '/esAll/searchHit',
        method: 'post',
        data: {
            keyword
        }
    })
}