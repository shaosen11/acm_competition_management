const routers = [
    {
        path: '/clubInfo',
        name: 'clubInfo',
        component: () => import('@/views/club/Club'),
        meta: {title: '俱乐部'}
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
        meta: {title: '管理页面', requireLogin: true, requireClub: true},
        redirect: 'club/activity',
        children: [
            {
                path: 'activity',
                name: 'activity',
                meta: {title: '活动管理', requireLogin: true, requireClub: true},
                components: {
                    club: () => import('@/views/club/Activity')
                }
            },
            {
                path: 'createActivity',
                name: 'createActivity',
                meta: {title: '创建活动', requireLogin: true, requireClub: true},
                components: {
                    club: () => import('@/views/club/CreateActivity')
                }
            },
            {
                path: 'activityUserRelationAnalysis',
                name: 'activityUserRelationAnalysis',
                meta: {title: '报名数据分析', requireLogin: true, requireClub: true},
                components: {
                    club: () => import('@/views/club/ActivityUserRelationAnalysis')
                }
            },
            {
                path: 'clubUser',
                name: 'clubUser',
                meta: {title: '会员列表', requireLogin: true, requireClub: true},
                components: {
                    club: () => import('@/views/club/ClubUser')
                }
            },
            {
                path: 'applyList',
                name: 'applyList',
                meta: {title: '申请列表', requireLogin: true},
                components: {
                    club: () => import('@/views/club/ApplyList')
                }
            },
        ]
    },
];

export default routers;