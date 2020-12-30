const routers = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/Index'),
        meta: {title: '管理中心'}
    }
];

export default routers;