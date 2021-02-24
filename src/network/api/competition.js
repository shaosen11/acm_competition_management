import {request} from "@/network/request";


//创建比赛
export function createCompetition(competition) {
    return request({
        url: '/competition/create',
        method: 'post',
        data: {
            name: competition.name,
            typeId: competition.typeId,
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
            online: competition.online,
            maxTeamNumber: competition.maxTeamNumber,
            maxUserNumber: competition.maxUserNumber
        }
    })
}

//查询竞赛列表
export function getCompetitionList(competition) {
    return request({
        url: '/competition/list',
        method: 'post',
        data: {
            typeId: competition.typeId,
            name: competition.name,
            showFlag: competition.showFlag,
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
            typeId: competition.typeId,
            description: competition.description,
            startTime: competition.startTime,
            endTime: competition.endTime,
            registrationTime: competition.registrationTime,
            registrationFlag: competition.registrationFlag,
            position: competition.position,
            teamFlag: competition.teamFlag,
            singleFlag: competition.singleFlag,
            userId: competition.userId,
            showFlag: competition.showFlag,
            cancelFlag: competition.cancelFlag,
            userName: competition.userName,
            online: competition.online,
            maxTeamNumber: competition.maxTeamNumber,
            maxUserNumber: competition.maxUserNumber,
            deleteFlag: competition.deleteFlag,
        }
    })
}

//修改比赛信息
export function deleteCompetition(competition) {
    return request({
        url: '/competition/delete',
        method: 'post',
        data: {
            id: competition.id,
            deleteFlag: competition.deleteFlag,
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
            singleFlag: competitionUserRelation.singleFlag
        }
    })
}

//获取报名列表
export function listCompetitionUserRelation(competitionUserRelationQueryParam) {
    return request({
        url: '/competitionUserRelation/list',
        method: 'post',
        data: {
            competitionId: competitionUserRelationQueryParam.competitionId,
            pageNum: competitionUserRelationQueryParam.pageNum,
            pageSize: competitionUserRelationQueryParam.pageSize,
        }
    })
}

//获取比赛类型
export function listCompetitionType(competitionType) {
    return request({
        url: '/competitionType/list',
        method: 'post',
        data: {
            showFlag: competitionType.showFlag,
        }
    })
}

//获取比赛类型分页信息
export function listCompetitionTypePage(competitionTypeQueryParam) {
    return request({
        url: '/competitionType/listByPage',
        method: 'post',
        data: {
            pageNum: competitionTypeQueryParam.pageNum,
            pageSize: competitionTypeQueryParam.pageSize,
        }
    })
}

//修改比赛类型
export function updateCompetitionType(competitionType) {
    return request({
        url: '/competitionType/update',
        method: 'post',
        data: {
            id: competitionType.id,
            name: competitionType.name,
            description: competitionType.description,
            view: competitionType.view,
            showFlag: competitionType.showFlag,
        }
    })
}
//创建比赛类型
export function createCompetitionType(competitionType) {
    return request({
        url: '/competitionType/create',
        method: 'post',
        data: {
            name: competitionType.name,
            description: competitionType.description,
            showFlag: competitionType.showFlag,
            userId: competitionType.userId,
            userName: competitionType.userName,
        }
    })
}

//根据比赛类型名称获取比赛类型
export function getByCompetitionTypeName(name) {
    return request({
        url: '/competitionType/getByName',
        method: 'post',
        data: {
            name
        }
    })
}

//导出报名数据
export function exportCompetitionUserRelation(competitionId) {
    return request({
        url: '/competitionUserRelation/export',
        method: 'post',
        data: {
            competitionId
        },
        responseType: 'blob'
    })
}

//新建题型
export function createCompetitionProblemType(competitionProblemType) {
    return request({
        url: '/competitionProblemType/create',
        method: 'post',
        data: {
            name: competitionProblemType.name,
            description: competitionProblemType.description,
            parentId: competitionProblemType.parentId,
            showFlag: competitionProblemType.showFlag,
            userId: competitionProblemType.userId,
            userName: competitionProblemType.userName
        },
    })
}
//修改题型
export function updateCompetitionProblemType(competitionProblemType) {
    return request({
        url: '/competitionProblemType/update',
        method: 'post',
        data: {
            id: competitionProblemType.id,
            name: competitionProblemType.name,
            description: competitionProblemType.description,
            parentId: competitionProblemType.parentId,
            showFlag: competitionProblemType.showFlag,
            userId: competitionProblemType.userId,
            userName: competitionProblemType.userName
        },
    })
}
//获取题型分页
export function listCompetitionProblemTypeByPage(competitionProblemTypeQueryParam) {
    return request({
        url: '/competitionProblemType/listByPage',
        method: 'post',
        data: {
            name: competitionProblemTypeQueryParam.name,
            parentId: competitionProblemTypeQueryParam.parentId,
            showFlag: competitionProblemTypeQueryParam.showFlag,
            pageNum: competitionProblemTypeQueryParam.pageNum,
            pageSize: competitionProblemTypeQueryParam.pageSize,
        },
    })
}
//获取题型列表
export function listCompetitionProblemType(competitionProblemType) {
    return request({
        url: '/competitionProblemType/list',
        method: 'post',
        data: {
            parentId: competitionProblemType.parentId,
            showFlag: competitionProblemType.showFlag
        }
    })
}

//获取题型列表
export function listCompetitionProblemTypeWithChildren(competitionProblemType) {
    return request({
        url: '/competitionProblemType/listWithChildren',
        method: 'post',
        data: {
            parentId: competitionProblemType.parentId,
            showFlag: competitionProblemType.showFlag
        }
    })
}

//根据比赛类型名称获取比赛类型
export function getByCompetitionProblemTypeName(name) {
    return request({
        url: '/competitionProblemType/getByName',
        method: 'post',
        data: {
            name
        }
    })
}


//获取所有题型
export function listChildrenCompetitionProblemType(name) {
    return request({
        url: '/competitionProblemType/listByParentName',
        method: 'post',
        data: {
            name
        }
    })
}