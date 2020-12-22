import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export function setCookie(key,value,expires) {
    return VueCookies.set(key, value, expires)
}

export function getCookie(key) {
    return VueCookies.get(key)
}

export function removeCookie(key) {
    return VueCookies.remove(key)
}