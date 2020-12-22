const routers = [
    {
        path: '/competition',
        name: 'Competition',
        component: () => import('@/views/competition/Competition'),
        meta: {title: '比赛', icon: 'home'}
    }
];

export default routers;