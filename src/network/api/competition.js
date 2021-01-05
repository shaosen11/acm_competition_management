import {request} from "@/network/request";


//创建比赛
export function createCompetition(competition) {
    return request({
        url: '/competition/create',
        method: 'post',
        data: {
            name: competition.name,
            description: competition.description,
            startTime: competition.startTime,
            endTime: competition.endTime,
            registrationTime: competition.registrationTime,
            position: competition.position,
            teamFlag: competition.teamFlag,
            singleFlag: competition.singleFlag,
            showFlag: competition.showFlag,
            userId: competition.userId,
            userName: competition.userName,
        }
    })
}

//查询竞赛列表
export function getCompetitionList(competition) {
    return request({
        url: '/competition/list',
        method: 'post',
        data: {
            pageNum: competition.pageNum,
            pageSize: competition.pageSize,
        }
    })
}


//修改比赛信息
export function updateCompetition(competition) {
    return request({
        url: '/competition/update',
        method: 'post',
        data: {
            id: competition.id,
            name: competition.name,
            description: competition.description,
            startTime: competition.startTime,
            endTime: competition.endTime,
            registrationTime: competition.registrationTime,
            registrationFlag: competition.registrationFlag,
            position: competition.position,
            teamFlag: competition.teamFlag,
            singleFlag: competition.singleFlag,
            showFlag: competition.showFlag,
            userId: competition.userId,
            userName: competition.userName,
        }
    })
}


//获取比赛信息
export function getCompetitionByCompetitionId(competition) {
    return request({
        url: '/competition/getByCompetitionId',
        method: 'post',
        data: {
            competitionId: competition.competitionId,
        }
    })
}


//报名比赛
export function applyJoinCompetition(competitionUserRelation) {
    return request({
        url: '/competitionUserRelation/insert',
        method: 'post',
        data: {
            competitionId: competitionUserRelation.competitionId,
            teamId: competitionUserRelation.teamId,
            teamFlag: competitionUserRelation.teamFlag,
            userId: competitionUserRelation.userId,
            singleFalg: competitionUserRelation.singleFalg
        }
    })
}