import {request} from '../request'

//通过用户id获取队伍信息
export function getTeamInfoByUserId(userId) {
    return request({
        url: '/team/getTeamInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//通过用户id获取队伍虽有信息
export function getTeamAllInfoByUserId(userId) {
    return request({
        url: '/team/getTeamAllInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//通过队伍名称获取队伍信息
export function getTeamAllInfoByTeamName(name) {
    return request({
        url: '/team/getTeamAllInfoByTeamName',
        method: 'post',
        data: {
            name
        }
    })
}

//修改队伍信息
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

//获取队伍分页信息
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

//创建队伍
export function createTeam(team) {
    return request({
        url: '/team/create',
        method: 'post',
        data: {
            name: team.name,
            userId: team.userId,
            userName: team.userName,
            motto: team.motto
        }
    })
}

//加入队伍
export function joinTeam(teamUserRelation) {
    return request({
        url: '/team/join',
        method: 'post',
        data:{
            teamId: teamUserRelation.teamId,
            userId: teamUserRelation.userId
        }
    })
}

//退出队伍
export function outTeam(teamUserRelation) {
    return request({
        url: '/team/out',
        method: 'post',
        data:{
            teamId: teamUserRelation.teamId,
            userId: teamUserRelation.userId
        }
    })
}

//删除队伍
export function deleteTeam(teamId) {
    return request({
        url: '/team/delete',
        method: 'post',
        data:{
            teamId: teamId,
        }
    })
}