const routers = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/Index'),
        meta: {title: '管理中心', requireAuth: true, requireLogin: true},
        redirect: 'admin/teacher',
        children: [
            {
                path: 'student',
                name: 'student',
                meta: {title: '学生管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Student'),
                }
            },
            {
                path: 'teacher',
                name: 'teacher',
                meta: {title: '教师管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Teacher'),
                }
            },
            {
                path: 'organizationList',
                name: 'organizationList',
                meta: {title: '班级列表', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/organization/List'),
                }
            },
            {
                path: 'applyList',
                name: 'applyList',
                meta: {title: '申请列表', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/organization/ApplyList'),
                }
            },
            {
                path: 'createOrganization',
                name: 'createOrganization',
                meta: {title: '创建班级', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/organization/Create'),
                }
            },
            {
                path: 'team',
                name: 'team',
                meta: {title: '队伍管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Team'),
                }
            },
            {
                path: 'competitionList',
                name: 'competitionList',
                meta: {title: '比赛列表', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/List'),
                }
            },
            {
                path: 'createCompetition',
                name: 'createCompetition',
                meta: {title: '创建比赛', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/Create'),
                }
            },
            {
                path: 'competitionUpdate',
                name: 'competitionUpdate',
                meta: {title: '比赛修改', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/Update'),
                }
            },
            {
                path: 'competitionType',
                name: 'competitionType',
                meta: {title: '比赛类型', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CompetitionType'),
                }
            },
            {
                path: 'createCompetitionType',
                name: 'createCompetitionType',
                meta: {title: '创建比赛类型', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CreateCompetitionType'),
                }
            },
            {
                path: 'competitionProblemType',
                name: 'competitionProblemType',
                meta: {title: '比赛题型', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CompetitionProblemType'),
                }
            },
            {
                path: 'createCompetitionProblemType',
                name: 'createCompetitionProblemType',
                meta: {title: '创建比赛题型', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CreateCompetitionProblemType'),
                }
            },
            {
                path: 'report',
                name: 'report',
                meta: {title: '报告管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Report'),
                }
            },
            {
                path: 'blog',
                name: 'blog',
                meta: {title: '论坛管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Blog'),
                }
            }
        ]
    }
];

export default routers;