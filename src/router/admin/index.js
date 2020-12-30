const routers = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/Index'),
        meta: {title: '管理中心'},
        children: [
            {
                path: 'student',
                name: 'student',
                meta: {title: '学生管理'},
                components: {
                    admin: () => import('@/views/admin/Student'),
                }
            },
            {
                path: 'teacher',
                name: 'teacher',
                meta: {title: '教师管理'},
                components: {
                    admin: () => import('@/views/admin/Teacher'),
                }
            },
            {
                path: 'organizationList',
                name: 'organizationList',
                meta: {title: '班级列表'},
                components: {
                    admin: () => import('@/views/admin/organization/OrganizationList'),
                }
            },
            {
                path: 'applicationList',
                name: 'applicationList',
                meta: {title: '申请列表'},
                components: {
                    admin: () => import('@/views/admin/organization/ApplicationList'),
                }
            },
            {
                path: 'report',
                name: 'report',
                meta: {title: '报告管理'},
                components: {
                    admin: () => import('@/views/admin/Report'),
                }
            },
            {
                path: 'blog',
                name: 'blog',
                meta: {title: '论坛管理'},
                components: {
                    admin: () => import('@/views/admin/Blog'),
                }
            }
        ]
    }
];

export default routers;