const routers = [
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/views/user/Index'),
        meta: {title: '个人信息'}
    },
    {
        path: '/updateUserInfo',
        name: 'updateUserInfo',
        component: () => import('@/views/user/Update'),
        meta: {title: '修改个人信息'}
    }
];

export default routers;