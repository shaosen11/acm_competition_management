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

//通过用户id获取队伍所有信息
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


//通过队伍名称获取队伍信息
export function getTeamByName(name) {
    return request({
        url: '/team/getTeamByName',
        method: 'post',
        data: {
            name
        }
    })
}

//通过队伍名称获取队伍信息
export function getTeamByEnglishName(englishName) {
    return request({
        url: '/team/getTeamByEnglishName',
        method: 'post',
        data: {
            englishName
        }
    })
}

//修改队伍信息
export function updateTeam(team) {
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
            userId: teamQuery.userId,
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
            englishName: team.englishName,
            userId: team.userId,
            userName: team.userName,
            motto: team.motto
        }
    })
}

//退出队伍
export function outTeam(teamUserRelation) {
    return request({
        url: '/teamUserRelation/delete',
        method: 'post',
        data:{
            teamId: teamUserRelation.teamId,
            userId: teamUserRelation.userId
        }
    })
}

//删除队伍
export function deleteTeam(team) {
    return request({
        url: '/team/delete',
        method: 'post',
        data:{
            teamId: team.teamId,
            name: team.name,
            userId: team.userId
        }
    })
}

//申请加入队伍
export function applyJoinTeam(teamUserCooperation){
    return request({
        url: '/TeamUserCooperation/applyJoinTeam',
        method: 'post',
        data:{
            teamId: teamUserCooperation.teamId,
            notInTeamUserId: teamUserCooperation.notInTeamUserId
        }
    })
}

//获取申请加入和邀请加入队伍列表
export function getTeamUserCooperationListByTeamName(teamUserCooperationQueryParam){
    return request({
        url: '/TeamUserCooperation/getListByTeamName',
        method: 'post',
        data:{
            name: teamUserCooperationQueryParam.teamName,
            pageNum: teamUserCooperationQueryParam.pageNum,
            pageSize: teamUserCooperationQueryParam.pageSize
        }
    })
}

//同意申请加入队伍
export function agreeJoinTeam(id){
    return request({
        url: '/TeamUserCooperation/agreeJoinTeam',
        method: 'post',
        data:{
            id
        }
    })
}