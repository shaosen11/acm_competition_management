<template>
    <div class="app-container">
        <el-row :gutter="20" v-loading.fullscreen.lock="fullscreenLoading">
            <el-col :span="6">
                <!--用户信息-->
                <user-statistics-info :user-ext="this.userExt"></user-statistics-info>
                <HotReport :reportHotList="this.reportHotList" style="margin-top: 10px"/>
                <hot-blog :blogHotList="this.blogHotList" style="margin-top: 10px"/>
            </el-col>
            <el-col :span="18">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card>
                            <span>班级</span>
                            <div class="divider"/>
                            <i class="iconfont el-icon-third-organization">
                                <span @click="toOrganizationInfo">
                                    <span class="organizationName">
                                         {{organization.year}}{{organization.name}}
                                    </span>
                                    <span v-if="organization.userCount!=null">
                                         <el-divider direction="vertical"></el-divider>
                                        <span>班级人数：{{organization.userCount}}</span>
                                    </span>
                                </span>
                            </i>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card>
                            <span>队伍</span>
                            <div class="divider"/>
                            <i class="iconfont el-icon-third-team">
                        <span>
                            <span class="teamName" @click="toTeamInfo(team.name)">
                                {{team.name}}
                            </span>
                            <span v-if="team.userCount!=null">
                                <el-divider direction="vertical"></el-divider>
                                <span>队伍人数：{{team.userCount}}</span>
                            </span>
                        </span>
                            </i>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="center" style="margin-top: 10px">
                    <el-col :span="8" v-for="(user, index) in this.users" :key="index">
                        <el-card shadow="hover">
                            <user-info :user="user"/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="18" style="margin: 10px 0px">
                <el-card>
                    <el-tabs v-model="activeTab" @tab-click="handleClick">
                        <el-tab-pane label="报告" name="report"/>
                        <el-tab-pane label="博客" name="blog"/>
                    </el-tabs>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <div style="margin: 20px 0px;">
                            <span class="title"
                                  @click="beforeTo(item)">
                                <span v-dompurify-html="item.name"/>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <el-tag v-if="item.blogId!=null">博客</el-tag>
                            <el-tag type="danger" v-if="item.reportId!=null">报告</el-tag>
                            <el-tag v-if="item.showFlag==0" type="info" style="margin-left: 10px">仅发布者可见</el-tag>
                            <p class="content markdown-body" v-dompurify-html="item.subContent"></p>
                        </div>
                        <div class="data">
                            {{ item.time }}
                            <el-divider direction="vertical"></el-divider>
                            <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-eye"/>
                            {{ item.visitCounter }}
                            </span>
                            <span style="margin-left: 10px">
                                <i class="iconfont el-icon-third-like"/>
                                {{ item.clickCounter }}
                            </span>
                            <span style="margin-left: 10px">
                                <i class="iconfont el-icon-third-heart"/>
                                {{ item.storeCounter }}
                            </span>
                        </div>
                        <el-divider/>
                    </div>
                    <div class="pagination-container" style="float: right; margin-bottom: 15px">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="query.pageNum"
                                :page-sizes="[5,10,15]"
                                :page-size="query.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                                :hide-on-single-page="isHide">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" type="flex" justify="center">
        </el-row>
    </div>
</template>

<script>
    import UserStatisticsInfo from "@/component/UserStatisticsInfo";
    import HotReport from "@/component/HotReport";
    import HotBlog from "@/component/HotBlog";
    import UserInfo from "@/component/UserInfo";
    import {getUserExtByUserId} from '@/network/api/user';
    import {getOrganizationByUserId} from '@/network/api/organization';
    import {getTeamAllInfoByUserId} from "@/network/api/team";
    import {getHotReportByUserId, listReportPage} from '@/network/api/report'
    import {listBlogPage, getHotBlogByUserId} from "@/network/api/blog";


    export default {
        name: "Info",
        components: {
            UserStatisticsInfo,
            HotReport,
            HotBlog,
            UserInfo,
        },
        data() {
            return {
                team: {},
                organization: {
                    year: '',
                    name: '',
                    userCount: ''
                },
                users: '',
                activeTab: 'blog',
                userId: '',
                userExt: {},
                reportHotList: [],
                blogHotList: [],
                query: {
                    userId: '',
                    status: 3,
                    pageNum: 1,
                    pageSize: 5,
                },
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
            }
        },
        created() {
            //初始化
            this.init(this.$route.query.userId)
        },
        methods: {
            //初始化方法
            init(userId) {
                const loading = this.$loading({
                    lock: true,
                    text: '正在加载',
                });
                this.userId = userId;
                this.getOrganization(userId);
                this.getTeamAllInfoByUserId(userId);
                this.getUserExtByUserId(userId);
                this.getHotReportByUserId(userId);
                this.getHotBlogByUserId(userId);
                this.getList();
                loading.close();
            },

            //获取班级信息
            getOrganization(userId) {
                getOrganizationByUserId(userId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    if (res.data != null) {
                        this.organization = res.data
                    }
                })
            },
            getTeamAllInfoByUserId(userId) {
                getTeamAllInfoByUserId(userId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    if (res.data.team != null) {
                        this.team = res.data.team;
                        this.users = res.data.users;
                        if (this.users.length < 3) {
                            let index = 3 - this.users.length;
                            for (let i = 0; i < index; i++) {
                                const user = {
                                    userId: '',
                                    userName: '',
                                    icon: ''
                                }
                                this.users.push(user);
                            }
                        }
                    }
                })
            },
            //个人设置中心
            toUserSetting() {
                this.$router.push('/user/setting')
            },
            toTeamInfo(teamName) {
                this.$router.push({name: 'teamInfo', query: {teamName}})
            },
            //获取用户扩展信息
            getUserExtByUserId(userId) {
                getUserExtByUserId(userId).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    this.userExt = res.data
                })
            },
            getHotReportByUserId(userId) {
                getHotReportByUserId(userId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.reportHotList = res.data
                })
            },
            getHotBlogByUserId(userId) {
                getHotBlogByUserId(userId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.blogHotList = res.data
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.query.pageNum = 1;
                this.query.pageSize = val;
                this.getList()
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.query.pageNum = val;
                this.getList()
            },
            getList() {
                if (this.activeTab == 'report') {
                    this.getReportList();
                }
                if (this.activeTab == 'blog') {
                    this.getBlogList();
                }
            },
            //切换tab
            handleClick(tab) {
                if (tab.name == 'report') {
                    this.getReportList()
                }
                if (tab.name == 'blog') {
                    this.getBlogList()
                }
            },
            getBlogList() {
                this.listLoading = true;
                this.query.userId = this.userId;
                listBlogPage(this.query).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.handleResult(res)
                })
            },
            getReportList() {
                this.listLoading = true;
                this.query.userId = this.userId;
                listReportPage(this.query).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.handleResult(res)
                })
            },
            handleResult(res) {
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.query.pageNum = res.data.pageNum;
                this.query.pageSize = res.data.pageSize;
                if (this.total > this.pageSize) {
                    this.isHide = false;
                } else {
                    this.isHide = true;
                }
                this.listLoading = false;
            },
            beforeTo(item) {
                if (item.blogId != null) {
                    this.toBlog(item.blogId)
                } else if (item.reportId != null) {
                    this.toReport(item.reportId)
                }
            },
            toReport(reportId) {
                this.$router.push({
                    name: 'reportInfo',
                    query: {reportId}
                })
            },
            toBlog(blogId) {
                this.$router.push({
                    name: 'blogInfo',
                    query: {blogId}
                })
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId}})
            },
            //跳转班级信息
            toOrganizationInfo() {
                this.$router.push({
                    name: 'organizationInfo',
                    query: {
                        year: this.organization.year,
                        name: this.organization.name
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .organizationName {
        font-size: 16px;
        font-weight: 500;
    }

    .organizationName:hover {
        color: #409EFF;
    }

    .teamName:hover {
        color: #409EFF;
    }

    .teamName {
        font-size: 16px;
        font-weight: 500;
    }

    .teamName:hover {
        color: #409EFF;
    }
</style>