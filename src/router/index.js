import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

import Login from '@/views/Login'
import Layout from "@/views/layout/Layout";
import adminRouters from '@/router/admin'
import blogRouters from '@/router/blog'
import competitionRouters from '@/router/competition'
import messageRouters from '@/router/message'
import organizationRouters from '@/router/organization'
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
            ...organizationRouters,
            ...reportRouters,
            ...teamRouters,
            ...userRouters,
            ...adminRouters
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
    NProgress.start()
    document.title = to.meta.title
    next()
})


router.afterEach(() => {
    NProgress.done() // 结束Progress
})

export default router
