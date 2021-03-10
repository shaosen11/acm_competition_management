import {request} from '../request'

//获取公告分页
export function listActivityByPage(activityQueryParam) {
    return request({
        url: '/club/listByPage',
        method: 'post',
        data: {
            showFlag: activityQueryParam.showFlag,
            pageNum: activityQueryParam.pageNum,
            pageSize: activityQueryParam.pageSize,
        }
    })
}

//修改公告
export function updateActivity(activity) {
    return request({
        url: '/club/update',
        method: 'post',
        data: {
            activityId: activity.activityId,
            name: activity.name,
            userId: activity.userId,
            startTime: activity.startTime,
            endTime: activity.endTime,
            position: activity.position,
            content: activity.content,
            contentMd: activity.contentMd,
            showFlag: activity.showFlag,
        }
    })
}
//发布公告
export function createActivity(activity) {
    return request({
        url: '/club/create',
        method: 'post',
        data: {
            name: activity.name,
            userId: activity.userId,
            startTime: activity.startTime,
            endTime: activity.endTime,
            position: activity.position,
            content: activity.content,
            contentMd: activity.contentMd,
            showFlag: activity.showFlag,
        }
    })
}

//获取公告内容
export function getByActivityId(activityId) {
    return request({
        url: '/club/getByActivityId',
        method: 'post',
        data: {
            activityId
        }
    })
}