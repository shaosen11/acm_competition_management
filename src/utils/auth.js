import {setCookie, getCookie, removeCookie} from '@/plugins/cookies';

const TokenKey = 'loginToken'

export function getToken() {
    return getCookie(TokenKey)
}

export function setToken(token) {
    return setCookie(TokenKey, token)
}

export function removeToken() {
    return removeCookie(TokenKey)
}
