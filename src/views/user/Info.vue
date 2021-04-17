<template>
    <div class="app-container">
        <el-row :gutter="20" v-loading.fullscreen.lock="fullscreenLoading">
            <el-col :span="6">
                <!--用户信息-->
                <user-statistics-info
                    :user-ext="userExt"
                    :follow-flag="followFlag"
                    :follow-show-flag="followShowFlag"
                    @follow="follow"
                    @cancelFollow="cancelFollow"/>
                <individual-web-site :user-ext="this.userExt" style="margin-top: 10px"/>
                <hot-blog v-if="this.blogHotList!=''" :blogHotList="this.blogHotList" style="margin-top: 10px"/>
                <hot-report v-if="this.reportHotList!=''" :reportHotList="this.reportHotList" style="margin-top: 10px"/>
                <el-card style="margin-top: 10px">
                    能力图
                    <div class="onePxDivider"></div>
                    <UserRadar
                        :user-radar="userRadar"
                        ref="userRadar"/>
                </el-card>
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
                                         {{ organization.year }}{{ organization.name }}
                                    </span>
                                    <span v-if="organization.userCount!=null">
                                         <el-divider direction="vertical"></el-divider>
                                        <span>班级人数：{{ organization.userCount }}</span>
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
                                {{ team.name }}
                            </span>
                            <span v-if="team.userCount!=null">
                                <el-divider direction="vertical"></el-divider>
                                <span>队伍人数：{{ team.userCount }}</span>
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
                        <el-tab-pane label="关注的人" name="user"/>
                        <el-tab-pane label="粉丝" name="follow"/>
                        <el-tab-pane label="收藏夹" name="store"/>
                    </el-tabs>
                    <div
                        v-if="reportOrBlogTabFlag==true&&userOrFollowTabFlag==false&&storeTabFlag==false"
                        v-for="item in this.tableData"
                        :key="item">
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
                    <el-table
                        v-if="reportOrBlogTabFlag==false&&userOrFollowTabFlag==true&&storeTabFlag==false"
                        v-loading="listLoading"
                        element-loading-text="努力加载中..."
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            label="头像"
                            width="100"
                            align="center">
                            <template slot-scope="scope">
                                <el-avatar :src="scope.row.icon"></el-avatar>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="姓名"
                            width="150"
                            align="center">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="toUserInfo(scope.row.userId)" :underline="false">
                                    <span>{{ scope.row.userName }}</span>
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="班级"
                            width="300"
                            align="center">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="toOrganizationInfo(scope.row)" :underline="false">
                                    <span>{{ scope.row.year }}{{ scope.row.organizationName }}</span>
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="队伍名称"
                            width="300"
                            align="center">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="toTeamInfo(scope.row.teamName)" :underline="false">
                                    <span>{{ scope.row.teamName }}</span>
                                </el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row v-if="reportOrBlogTabFlag==false&&userOrFollowTabFlag==false&&storeTabFlag==true">
                        <el-col :span="4">
                            <el-menu class="el-menu-vertical-demo" style="text-align: center">
                                <el-menu-item v-for="(userStoreFolder, index) in this.userStoreFolder"
                                              :key="userStoreFolder"
                                              :index="index"
                                              @click="selectUserStoreFolder(index)">
                                    <i class="iconfont el-icon-third-folder-open"
                                       style="font-size: 20px; margin-right: 5px"></i>
                                    <span slot="title">{{ userStoreFolder.name }}</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>

                        <el-col :span="20">
                            <el-card>
                                <div>
                                    <b>{{ this.userStoreFolderItem.name }}</b>
                                </div>
                                <p class="description">
                                    {{ this.userStoreFolderItem.description }}
                                </p>
                                <!--收藏夹内容-->
                                <el-row :gutter="10">
                                    <el-col :span="24" v-for="userStore in this.userStore" :key="userStore"
                                            style="margin-top: 10px">
                                        <el-card shadow="hover">
                                            <div>
                                                <span v-if="userStore.blogFlag == 1">
                                                    <el-tag>博客</el-tag>
                                                    <span class="userStoreName"
                                                          @click="toBlog(userStore.blogId)">{{ userStore.blogName }}</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <span>by </span>
                                                    <span class="userName" v-dompurify-html="userStore.userName"/>
                                                </span>
                                                <span v-if="userStore.reportFlag == 1">
                                                    <el-tag type="danger">报告</el-tag>
                                                   <span class="userStoreName"
                                                         @click="toReport(userStore.reportId)">{{ userStore.reportName }}</span>
                                                    <el-divider direction="vertical"></el-divider>
                                                    <span>by </span>
                                                    <span class="userName" v-dompurify-html="userStore.userName"/>
                                                </span>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                    <div class="pagination-container"
                         v-if="reportOrBlogTabFlag==true||userOrFollowTabFlag==true"
                         style="float: right; margin-bottom: 15px">
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
import individualWebSite from "@/component/individualWebSite";
import UserRadar from "@/component/UserRadar";
import {
    cancelFollow,
    follow,
    getByUserIdAndFollowUserId,
    getUserExtByUserId,
    getUserRadarByUserId,
    listFollowUserPage,
    listUserPage,
    getUserStoreFolder,
    listUserStoreByParentId
} from '@/network/api/user';
import {getOrganizationByUserId} from '@/network/api/organization';
import {getTeamAllInfoByUserId} from "@/network/api/team";
import {listReportPage, getHotReportByUserId} from '@/network/api/report'
import {listBlogPage, getHotBlogByUserId} from "@/network/api/blog";


export default {
    name: "Info",
    components: {
        UserStatisticsInfo,
        HotReport,
        HotBlog,
        UserInfo,
        individualWebSite,
        UserRadar
    },
    data() {
        return {
            //团队
            team: {},
            //班级
            organization: {
                year: '',
                name: '',
                userCount: ''
            },
            //用户
            users: '',
            //当前tab
            activeTab: 'report',
            //旧tab
            oldTab: 'report',
            //当前页面用户id
            userId: '',
            //用户扩展数据
            userExt: {},
            //热门报告列表
            reportHotList: [],
            //热门博客列表
            blogHotList: [],
            //表单查询实体
            query: {
                userId: '',
                status: 3,
                pageNum: 1,
                pageSize: 10,
            },
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //表单页面数量
            totalPage: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            //关注标记
            followFlag: false,
            //是否展示关注标记
            followShowFlag: true,
            //用户能力图
            userRadar: [],
            //是否报告或博客面板标记
            reportOrBlogTabFlag: true,
            //是否用户面板标记
            userOrFollowTabFlag: false,
            //是否收藏夹面板标记
            storeTabFlag: false,
            //用户收藏夹
            userStoreFolder: [],
            //记录用户第几个收藏的文件夹
            userStoreFolderIndex: '',
            userStoreFolderItem: {
                id: 0,
                showFlag: 0
            },
            //用户收藏夹内容
            userStore: [],
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
            this.getUserRadarByUserId(userId);
            this.getHotReportByUserId(userId);
            this.getHotBlogByUserId(userId);
            this.getList();
            this.getByUserIdAndFollowUserId();
            this.initFollowFlag();
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
        //获取团队信息
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
        //团队中心
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
        //获取用户人报告
        getHotReportByUserId(userId) {
            getHotReportByUserId(userId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.reportHotList = res.data
            })
        },
        //获取用热门博客
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
        //切换tab
        beforeToTab(tab) {
            if (this.oldTab != tab) {
                this.query.pageNum = 1;
                this.query.pageSize = 10;
            }
        },
        //报告或者博客面板
        toReportOrBlogTab() {
            this.reportOrBlogTabFlag = true;
            this.userOrFollowTabFlag = false;
            this.storeTabFlag = false;
        },
        //关注面板
        toUserOrFollowTab() {
            this.reportOrBlogTabFlag = false;
            this.userOrFollowTabFlag = true;
            this.storeTabFlag = false;
        },
        //收藏面板
        toStoreTabTab() {
            this.reportOrBlogTabFlag = false;
            this.userOrFollowTabFlag = false;
            this.storeTabFlag = true;
        },
        //获取表单数据
        getList() {
            this.beforeToTab(this.activeTab)
            if (this.activeTab == 'report') {
                this.oldTab = 'report';
                this.toReportOrBlogTab();
                this.getReportList();
            }
            if (this.activeTab == 'blog') {
                this.oldTab = 'blog';
                this.toReportOrBlogTab();
                this.getBlogList();
            }
            if (this.activeTab == 'user') {
                this.oldTab = 'user';
                this.toUserOrFollowTab();
                this.getUserList();
            }
            if (this.activeTab == 'follow') {
                this.oldTab = 'follow';
                this.toUserOrFollowTab();
                this.getFollowUserList();
            }
            if (this.activeTab == 'store') {
                this.oldTab = 'store';
                this.toStoreTabTab();
                this.getUserStoreFolder();
            }
        },
        //切换tab
        handleClick(tab) {
            this.beforeToTab(tab.name)
            if (tab.name == 'report') {
                this.oldTab = 'report';
                this.toReportOrBlogTab();
                this.getReportList();
            }
            if (tab.name == 'blog') {
                this.oldTab = 'blog';
                this.toReportOrBlogTab();
                this.getBlogList();
            }
            if (this.activeTab == 'user') {
                this.oldTab = 'user';
                this.toUserOrFollowTab();
                this.getUserList();
            }
            if (this.activeTab == 'follow') {
                this.oldTab = 'follow';
                this.toUserOrFollowTab();
                this.getFollowUserList();
            }
            if (this.activeTab == 'store') {
                this.oldTab = 'store';
                this.toStoreTabTab();
                this.getUserStoreFolder();
            }
        },
        //获取用户博客列表
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
        //获取用户报告列表
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
        //获取关注列表
        getUserList() {
            this.listLoading = true;
            listUserPage(this.query).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                this.handleResult(res)
            })
        },
        //获取关注列表
        getFollowUserList() {
            this.listLoading = true;
            listFollowUserPage(this.query).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                this.handleResult(res)
            })
        },
        //统一处理结果
        handleResult(res) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.totalPage = res.data.totalPage;
            this.query.pageNum = res.data.pageNum;
            this.query.pageSize = res.data.pageSize;
            if (this.totalPage != 0 && this.query.pageNum > this.totalPage) {
                this.query.pageNum = 1;
                this.query.pageSize = 10;
                this.getList();
            }
            if (this.total > this.pageSize) {
                this.isHide = false;
            } else {
                this.isHide = true;
            }
            this.listLoading = false;
        },
        //跳转之前判断
        beforeTo(item) {
            if (item.blogId != null) {
                this.toBlog(item.blogId)
            } else if (item.reportId != null) {
                this.toReport(item.reportId)
            }
        },
        //去博客页面
        toBlog(blogId) {
            this.$router.push({
                name: 'blogInfo',
                query: {blogId}
            })
        },
        //跳转博客
        toReport(reportId) {
            this.$router.push({
                name: 'reportInfo',
                query: {reportId}
            })
        },
        //去用户页面
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
        initFollowFlag() {
            if (this.$store.state.user.userId == this.$route.query.userId) {
                this.followShowFlag = false;
            }
        },
        //获取是否关注
        getByUserIdAndFollowUserId() {
            const userFollow = {
                followUserId: this.$route.query.userId,
                userId: this.$store.state.user.userId,
            }
            getByUserIdAndFollowUserId(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.followFlag = res.data
            })
        },
        //关注
        follow(userFollow) {
            follow(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
                this.followFlag = true
            })
        },
        //取消关注
        cancelFollow(userFollow) {
            cancelFollow(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
                this.followFlag = false
            })
        },
        //获取用户能力图
        getUserRadarByUserId(userId) {
            getUserRadarByUserId(userId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                res.data.name = this.userExt.userName
                this.userRadar.push(res.data);
                this.$refs.userRadar.init();
            })
        },
        //获取收藏夹
        getUserStoreFolder() {
            const userStore = {
                userId: this.userId,
                folderFlag: 0,
                showFlag: 1
            }
            getUserStoreFolder(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStoreFolder = res.data
                this.selectUserStoreFolder(0)
            })
        },
        //选择收藏夹
        selectUserStoreFolder(index) {
            if (index === this.userStoreFolderIndex){
                return;
            }
            this.userStore = [];
            this.userStoreFolderIndex = index;
            this.userStoreFolderItem = this.userStoreFolder[index];
            const userStore = {
                parentId: this.userStoreFolderItem.id,
                showFlag: 1
            }
            listUserStoreByParentId(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStore = res.data
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

.pagination-container {
    margin: 15px auto;
}

.description {
    margin: 5px 0px;
    color: #909399;
}

.userStoreName {
    margin-left: 15px
}

.userStoreName:hover {
    color: #409EFF;
}
</style>