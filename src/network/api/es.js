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
export function searchHitEsAll(keyword) {
    return request({
        url: '/esAll/searchHit',
        method: 'post',
        data: {
            keyword
        }
    })
}

export function searchEsReport(esReportQueryParam) {
    return request({
        url: '/esReport/search',
        method: 'post',
        data: {
            keyword: esReportQueryParam.keyword,
            problemTypeName: esReportQueryParam.problemTypeName,
            pageNum: esReportQueryParam.pageNum,
            pageSize: esReportQueryParam.pageSize,
            lastFlag: esReportQueryParam.lastFlag,
            hotFlag: esReportQueryParam.hotFlag,
        }
    })
}

//搜索博客
export function searchHitEsReport(esReportQueryParam) {
    return request({
        url: '/esReport/searchHit',
        method: 'post',
        data: {
            keyword: esReportQueryParam.keyword,
            problemTypeName: esReportQueryParam.problemTypeName
        }
    })
}

//删除博客索引
export function deleteEsBlogIndex() {
    return request({
        url: '/esBlog/deleteIndex',
        method: 'post',
        data: {}
    })
}

//博客索引导入
export function importEsBlogAll() {
    return request({
        url: '/esBlog/importAll',
        method: 'post',
        data: {}
    })
}

//导入报告索引
export function deleteEsReportIndex() {
    return request({
        url: '/esReport/deleteIndex',
        method: 'post',
        data: {}
    })
}

//博客索引导入
export function importEsReportAll() {
    return request({
        url: '/esReport/importAll',
        method: 'post',
        data: {}
    })
}

//博客索引导入
export function beforeSearch() {
    return request({
        url: '/esAll/beforeSearch',
        method: 'get',
    })
}
