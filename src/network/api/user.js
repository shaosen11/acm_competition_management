import {request} from '../request'

//登录
export function login(userId, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            userId,
            password
        }
    })
}

//注册用户
export function register(user) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            userId: user.userId,
            email: user.email,
            name: user.name,
            password: user.password
        }
    })
}

//获取用户信息
export function getUserInfo(userId) {
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//修改用户信息
export function updateUserInfo(user) {
    return request({
        url: '/user/update',
        method: 'post',
        data: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            gender: user.gender,
            enableFlag: user.enableFlag
        }
    })
}

//修改密码
export function updatePassword(user) {
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data: {
            userId: user.userId,
            password: user.password
        }
    })
}

//通过用户账号查询用户
export function getByUserId(userId){
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//通过邮箱查询用户
export function getByEmail(email){
    return request({
        url: '/user/getByEmail',
        method: 'post',
        data: {
            email
        }
    })
}

//获取用户信息，团队信息，班级信息
export function getUserAllInfoByUserId(userId){
    return request({
        url: '/user/getUserAllInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//获取学生列表
export function ListUser(userQuery){
    return request({
        url: '/user/list',
        method: 'post',
        data: {
            userId: userQuery.userId,
            name: userQuery.name,
            identityFlag: userQuery.identityFlag,
            year: userQuery.year,
            organizationName: userQuery.organizationName,
            pageNum: userQuery.pageNum,
            pageSize: userQuery.pageSize,
        }
    })
}

//获取用户扩展信息
export function getUserExtByUserId(userId){
    return request({
        url: '/userExt/getByUserId',
        method: 'post',
        data: {
            userId,
        }
    })
}
