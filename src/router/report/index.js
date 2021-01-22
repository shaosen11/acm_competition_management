const routers = [
    {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/report/Report'),
        meta: {title: '解题报告'}
    }
];

export default routers;