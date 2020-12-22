const routers = [
    {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/Message'),
        meta: {title: '消息', icon: 'home'}
    }
];

export default routers;