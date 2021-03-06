import {request} from "../request";

//获取公告分页
export function listNoticePage(noticeQueryParam) {
    return request({
        url: '/notice/listByPage',
        method: 'post',
        data: {
            showFlag: noticeQueryParam.showFlag,
            pageNum: noticeQueryParam.pageNum,
            pageSize: noticeQueryParam.pageSize,
        }
    })
}

//获取公告分页
export function listNotice(showFlag) {
    return request({
        url: '/notice/list',
        method: 'post',
        data: {
            showFlag
        }
    })
}

//修改公告
export function updateNotice(notice) {
    return request({
        url: '/notice/update',
        method: 'post',
        data: {
            noticeId: notice.noticeId,
            name: notice.name,
            userId: notice.userId,
            content: notice.content,
            contentMd: notice.contentMd,
            showFlag: notice.showFlag,
        }
    })
}
//发布公告
export function createNotice(notice) {
    return request({
        url: '/notice/create',
        method: 'post',
        data: {
            noticeId: notice.noticeId,
            name: notice.name,
            userId: notice.userId,
            content: notice.content,
            contentMd: notice.contentMd,
            showFlag: notice.showFlag,
        }
    })
}

//获取公告内容
export function getByNoticeId(noticeId) {
    return request({
        url: '/notice/getByNoticeId',
        method: 'post',
        data: {
            noticeId
        }
    })
}

//获取公告内容
export function deleteByNoticeId(noticeId) {
    return request({
        url: '/notice/delete',
        method: 'post',
        data: {
            noticeId
        }
    })
}