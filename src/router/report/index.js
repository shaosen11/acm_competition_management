const routers = [
    {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/report/Report'),
        meta: {title: '解题报告'}
    },
    {
        path: 'reportCreate',
        name: 'reportCreate',
        component: () => import('@/views/report/Create'),
        meta: {title: '创建报告', requireLogin: true}
    },
];

export default routers;