const routers = [
    {
        path: '/competition',
        name: 'Competition',
        component: () => import('@/views/competition/Competition'),
        meta: {title: '比赛'}
    },
    {
        path: '/competitionInfo',
        name: 'competitionInfo',
        component: () => import('@/views/competition/Info'),
        meta: {title: '比赛信息'}
    }
];

export default routers;