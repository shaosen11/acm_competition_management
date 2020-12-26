const routers = [
    {
        path: '/team',
        name: 'team',
        component: () => import('@/views/team/Index'),
        meta: {title: '我的队伍'}
    },
    {
        path: '/teamList',
        name: 'teamList',
        component: () => import('@/views/team/List'),
        meta: {title: '队伍列表'}
    },
    {
        path: '/team/create',
        name: '/team/create',
        component: () => import('@/views/team/Create'),
        meta: {title: '创建队伍'}
    }
];

export default routers;