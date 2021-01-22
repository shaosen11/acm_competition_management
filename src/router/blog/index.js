const routers = [
    {
        path: 'blogCreate',
        name: 'blogCreate',
        component: () => import('@/views/blog/Create'),
        meta: {title: '创建博客', requireLogin: true}
    },
    {
        path: 'blogList',
        name: 'blogList',
        component: () => import('@/views/blog/List'),
        meta: {title: '博客列表', requireLogin: true}
    },
    {
        path: 'blogInfo',
        name: 'blogInfo',
        component: () => import('@/views/blog/Info'),
        meta: {title: '博客'}
    },
];

export default routers;