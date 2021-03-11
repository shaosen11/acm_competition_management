import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// 引入vuex
import store from '@/store';
import {Message} from 'element-ui'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
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
import clubRouters from '@/router/club'

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
            {
                path: 'notice',
                name: 'notice',
                component: () => import('@/views/home/Notice'),
                meta: {title: '通告'}
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/home/Search'),
                meta: {title: '搜索'}
            },
            ...blogRouters,
            ...competitionRouters,
            ...messageRouters,
            ...organizationRouters,
            ...reportRouters,
            ...teamRouters,
            ...userRouters,
            ...clubRouters,
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
    },
    {
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: () => import('@/views/ForgetPassword'),
        meta: {title: '忘记密码'}
    },
    {
        path: '/resetPassword',
        name: 'resetPassword',
        component: () => import('@/views/ResetPassword'),
        meta: {title: '重置密码'}
    },
    {
        path: '/404',
        component: () => import('@/views/404'), hidden: true
    },
    {
        path: '*', redirect: '/404', hidden: true
    }
]


const router = new VueRouter({
    routes,
    base: process.env.NODE_ENV === 'prod' ? '/acm/' : '/',
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.meta.requireLogin && !store.state.user.isLogin) {
        Message({
            message: "请先登录",
            type: 'info',
        })
        document.title = "登录"
        next('/login')
    }
    if (to.meta.requireClub && store.state.club.clubFlag != 2) {
        Message({
            message: "请用俱乐部管理员账号登录",
            type: 'clubInfo',
        })
        document.title = "首页"
        next('/home')
    }
    if (to.meta.requireAuth && store.state.user.identityFlag != 1) {
        Message({
            message: "请用管理员账号登录",
            type: 'error',
        })
        document.title = "首页"
        next('/home')
    }
    document.title = to.meta.title
    next()
})


router.afterEach(() => {
    NProgress.done() // 结束Progress
})

export default router
