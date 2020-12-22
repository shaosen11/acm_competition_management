const routers = [
    {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/blog/Blog'),
        meta: {title: '博客', icon: 'home'}
    }
];

export default routers;