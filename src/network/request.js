import axios from 'axios';
import baseUrl from './baseUrl';

export function request(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 150000,
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json'
        const token = window.sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token
        }
        return config;
    }, err => {
        console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}
