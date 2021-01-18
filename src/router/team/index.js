const routers = [
    {
        path: '/teamInfo',
        name: 'teamInfo',
        component: () => import('@/views/team/Info'),
        meta: {title: '我的队伍'},
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
        meta: {title: '创建队伍'}
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
                meta: {title: '队伍设置'},
                components: {
                    team: () => import('@/views/team/Setting')
                }
            },
            {
                path: 'applyList',
                name: 'applyList',
                meta: {title: '队伍设置'},
                components: {
                    team: () => import('@/views/team/ApplyList')
                }
            },
        ]
    }
];

export default routers;