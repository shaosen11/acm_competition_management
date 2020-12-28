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

export function getByUserId(userId){
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

export function getByEmail(email){
    return request({
        url: '/user/getByEmail',
        method: 'post',
        data: {
            email
        }
    })
}

export function getUserAllInfoByUserId(userId){
    return request({
        url: '/user/getUserAllInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}