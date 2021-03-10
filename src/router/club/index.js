const routers = [
    {
        path: '/clubInfo',
        name: 'clubInfo',
        component: () => import('@/views/club/Club'),
        meta: {title: '比赛列表'}
    },
    {
        path: '/activityInfo',
        name: 'activityInfo',
        component: () => import('@/views/club/ActivityInfo'),
        meta: {title: '活动信息'}
    },
    {
        path: 'club',
        name: 'club',
        component: () => import('@/views/club/Index'),
        meta: {title: '管理页面', requireLogin: true},
        redirect: 'club/activity',
        children: [
            {
                path: 'activity',
                name: 'activity',
                meta: {title: '活动管理', requireLogin: true},
                components: {
                    club: () => import('@/views/club/Activity')
                }
            },
            {
                path: 'createActivity',
                name: 'createActivity',
                meta: {title: '创建活动', requireLogin: true},
                components: {
                    club: () => import('@/views/club/CreateActivity')
                }
            },
        ]
    },
];

export default routers;