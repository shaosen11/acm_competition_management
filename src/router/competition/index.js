const routers = [
    {
        path: '/competition',
        name: 'Competition',
        component: () => import('@/views/competition/List'),
        meta: {title: '比赛列表'}
    },
    {
        path: '/onlineJudge',
        name: 'OnlineJudge',
        component: () => import('@/views/competition/OnlineJudge'),
        meta: {title: 'OJ系统'}
    },
    {
        path: '/competitionInfo',
        name: 'competitionInfo',
        component: () => import('@/views/competition/Info'),
        meta: {title: '比赛信息'}
    },
    {
        path: '/competitionType',
        name: 'competitionType',
        component: () => import('@/views/competition/CompetitionType'),
        meta: {title: '比赛类型'}
    },
    {
        path: '/competitionProblemType',
        name: 'competitionProblemType',
        component: () => import('@/views/competition/CompetitionProblemType'),
        meta: {title: '比赛题型'}
    },
    {
        path: '/competitionProblemTypeList',
        name: 'competitionProblemTypeList',
        component: () => import('@/views/competition/CompetitionProblemTypeList'),
        meta: {title: '比赛题型'}
    }
];

export default routers;