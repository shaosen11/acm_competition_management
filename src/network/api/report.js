import {request} from '../request'

//获取OJ
export function listOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/list',
        method: 'post',
        data: {
            showFlag: onlineJudgeSystem.showFlag,
        }
    })
}

//获取OJ分页信息
export function listOnlineJudgeSystemPage(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/listByPage',
        method: 'post',
        data: {
            pageNum: onlineJudgeSystem.pageNum,
            pageSize: onlineJudgeSystem.pageSize,
        }
    })
}

//修改OJ
export function updateOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/update',
        method: 'post',
        data: {
            id: onlineJudgeSystem.id,
            name: onlineJudgeSystem.name,
            description: onlineJudgeSystem.description,
            url: onlineJudgeSystem.url,
            showFlag: onlineJudgeSystem.showFlag,
        }
    })
}
//创建OJ
export function createOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/create',
        method: 'post',
        data: {
            name: onlineJudgeSystem.name,
            description: onlineJudgeSystem.description,
            showFlag: onlineJudgeSystem.showFlag,
            url: onlineJudgeSystem.url,
            userId: onlineJudgeSystem.userId,
        }
    })
}

//根据OJ名称获取OJ
export function getByOnlineJudgeSystemName(name) {
    return request({
        url: '/onlineJudgeSystem/getByName',
        method: 'post',
        data: {
            name
        }
    })
}