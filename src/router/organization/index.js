const routers = [
    {
        path: '/organizationInfo',
        name: 'organizationInfo',
        component: () => import('@/views/organization/Index'),
        meta: {title: '班级信息'}
    },
    {
        path: '/organizationList',
        name: 'organizationList',
        component: () => import('@/views/organization/List'),
        meta: {title: '班级列表'}
    },
    {
        path: '/ApplicationList',
        name: 'ApplicationList',
        component: () => import('@/views/organization/ApplicationList'),
        meta: {title: '申请列表'}
    }
];

export default routers;