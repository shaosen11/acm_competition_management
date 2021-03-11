import {request} from '../request'


//获取公告列表
export function listClubActivity(showFlag) {
    return request({
        url: '/club/list',
        method: 'post',
        data: {
            showFlag
        }
    })
}

//获取活动分页
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

//修改活动
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
//发布活动
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

//获取活动
export function getByActivityId(activityId) {
    return request({
        url: '/club/getByActivityId',
        method: 'post',
        data: {
            activityId
        }
    })
}

//申请加入俱乐部
export function applyJoinClue(userId) {
    return request({
        url: '/clubActivityUserCooperation/applyJoinClue',
        method: 'post',
        data: {
            userId
        }
    })
}

//获取申请列表
export function getApplyList(clubActivityUserCooperationQueryParam) {
    return request({
        url: '/clubActivityUserCooperation/getApplyList',
        method: 'post',
        data: {
            pageNum: clubActivityUserCooperationQueryParam.pageNum,
            pageSize: clubActivityUserCooperationQueryParam.pageSize,
        }
    })
}

//批量同意
export function batchAgree(ids) {
    return request({
        url: '/clubActivityUserCooperation/batchAgree',
        method: 'post',
        data: {
            ids
        }
    })
}

//批量同意
export function getClubStatistics() {
    return request({
        url: '/clubStatistics/get',
        method: 'get',
    })
}

//退出俱乐部
export function outClub(userId) {
    return request({
        url: '/clubActivityUserCooperation/outClub',
        method: 'post',
        data: {
            userId
        }
    })
}