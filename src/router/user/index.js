const routers = [
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/views/user/Index'),
        meta: {title: '个人中心'}
    },
    {
        path: '/userSetting',
        name: 'userSetting',
        component: () => import('@/views/user/Setting'),
        meta: {title: '个人设置'}
    }
];

export default routers;