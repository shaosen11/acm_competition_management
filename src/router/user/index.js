const routers = [
    {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/views/user/Info'),
        meta: {title: '个人中心'}
    },
    {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/Index'),
        meta: {title: '个人中心', requireLogin: true},
        redirect: 'user/setting',
        children: [
            {
                path: 'setting',
                name: 'setting',
                meta: {title: '个人设置', requireLogin: true},
                components: {
                    user: () => import('@/views/user/Setting')
                }
            },
            {
                path: 'password',
                name: 'password',
                meta: {title: '安全设置', requireLogin: true},
                components: {
                    user: () => import('@/views/user/Password')
                }
            },
        ]
    }
];

export default routers;