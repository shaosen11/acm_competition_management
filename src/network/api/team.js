import {request} from '../request'

export function getTeamInfoByUserId(userId) {
    return request({
        url: '/team/getTeamInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

export function getTeamAllInfoByUserId(userId) {
    return request({
        url: '/team/getTeamAllInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

export function getTeamAllInfoByTeamName(name) {
    return request({
        url: '/team/getTeamAllInfoByTeamName',
        method: 'post',
        data: {
            name
        }
    })
}

export function updateTeamInfo(team) {
    return request({
        url: '/team/update',
        method: 'post',
        data: {
            teamId: team.teamId,
            name: team.name,
            userId: team.userId,
            motto: team.motto
        }
    })
}

export function getTeamList(teamQuery) {
    return request({
        url: '/team/list',
        method: 'post',
        data: {
            name: teamQuery.name,
            userCount: teamQuery.userCount,
            pageNum: teamQuery.pageNum,
            pageSize: teamQuery.pageSize,
        }
    })
}

export function judgeTeamUser(userId) {
    return request({
        url: '/team/list',
        method: 'post',
        data: {
            userId: userId,
        }
    })
}