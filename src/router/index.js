import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

import Login from '@/views/Login'
import Layout from "@/views/layout/Layout";
import blogRouters from '@/router/blog'
import competitionRouters from '@/router/competition'
import messageRouters from '@/router/message'
import reportRouters from '@/router/report'
import teamRouters from '@/router/team'
import userRouters from '@/router/user'

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/home/Home'),
            meta: {title: '首页'}
            },
            ...blogRouters,
            ...competitionRouters,
            ...messageRouters,
            ...reportRouters,
            ...teamRouters,
            ...userRouters
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {title: '登录'}
    },
    {
        path: '/loginOut',
        name: 'loginOut',
        redirect: '/login',
        meta: {title: '登录'}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register'),
        meta: {title: '注册'}
    }
]


const router = new VueRouter({
    routes,
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})



export default router
