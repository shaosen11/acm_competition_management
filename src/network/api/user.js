import {request} from '../request'

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

export function getUserInfo(userId) {
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

export function updateUserInfo(user) {
    return request({
        url: '/user/update',
        method: 'post',
        data: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            gender: user.gender
        }
    })
}

export function getOrganizationByUserId(userId) {
    return request({
        url: '/organization/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}