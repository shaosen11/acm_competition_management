const routers = [
    {
        path: '/teamInfo',
        name: 'teamInfo',
        component: () => import('@/views/team/Info'),
        meta: {title: '我的队伍', requireLogin: true}
    },
    {
        path: '/teamList',
        name: 'teamList',
        component: () => import('@/views/team/List'),
        meta: {title: '队伍列表'}
    },
    {
        path: '/teamCreate',
        name: 'teamCreate',
        component: () => import('@/views/team/Create'),
        meta: {title: '创建队伍', requireLogin: true}
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('@/views/team/Index'),
        meta: {title: '队伍中心'},
        redirect: 'team/setting',
        children: [
            {
                path: 'setting',
                name: 'setting',
                meta: {title: '队伍设置', requireLogin: true},
                components: {
                    team: () => import('@/views/team/Setting')
                }
            },
            {
                path: 'applyList',
                name: 'applyList',
                meta: {title: '队伍设置', requireLogin: true},
                components: {
                    team: () => import('@/views/team/ApplyList')
                }
            },
        ]
    }
];

export default routers;