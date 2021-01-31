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
            {
                path: 'store',
                name: 'store',
                meta: {title: '个人收藏', requireLogin: true},
                components: {
                    user: () => import('@/views/user/Store')
                }
            },
            {
                path: 'createStore',
                name: 'createStore',
                meta: {title: '创建收藏夹', requireLogin: true},
                components: {
                    user: () => import('@/views/user/components/CreateStore')
                }
            },
        ]
    }
];

export default routers;