const routers = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/Index'),
        meta: {title: '管理中心', requireAuth: true, requireLogin: true},
        redirect: 'admin/userLoginAnalysis',
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
                meta: {title: '老师管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/teacher/Teacher'),
                }
            },
            {
                path: 'createTeacher',
                name: 'createTeacher',
                meta: {title: '新增老师', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/teacher/CreateTeacher'),
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
                path: 'updateOrganization',
                name: 'updateOrganization',
                meta: {title: '修改班级信息', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/organization/Update'),
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
                path: 'competitionAnalysis',
                name: 'competitionAnalysis',
                meta: {title: '比赛列表', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CompetitionAnalysis'),
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
                path: 'onlineJudge',
                name: 'onlineJudge',
                meta: {title: 'OJ系统', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/OnlineJudge'),
                }
            },
            {
                path: 'createOnlineJudge',
                name: 'createOnlineJudge',
                meta: {title: '创建OJ系统', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/competition/CreateOnlineJudge'),
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
            },
            {
                path: 'notice',
                name: 'notice',
                meta: {title: '公告管理', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/notice/Notice'),
                }
            },
            {
                path: 'createNotice',
                name: 'createNotice',
                meta: {title: '创建公告', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/notice/Create'),
                }
            },
            {
                path: 'userLoginAnalysis',
                name: 'userLoginAnalysis',
                meta: {title: '用户登录日志', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/UserLoginAnalysis'),
                }
            },
            {
                path: 'ESManagement',
                name: 'ESManagement',
                meta: {title: '用户登录日志', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/ESManagement'),
                }
            },
            {
                path: 'task',
                name: 'task',
                meta: {title: '定时任务', requireAuth: true, requireLogin: true},
                components: {
                    admin: () => import('@/views/admin/Task'),
                }
            }
        ]
    }
];

export default routers;