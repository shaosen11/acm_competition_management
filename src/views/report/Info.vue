<template>
    <div>
        <div class="blog-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <!--用户信息-->
                    <user-statistics-info :user-id="this.userId"
                                          :user-ext="this.userExt"></user-statistics-info>
                    <el-card class="box-card" style="margin-top: 10px">
                        <div slot="header">
                            <span>题目信息</span>
                        </div>
                        <el-form :model="report" label-width="50px">
                            <el-form-item label="名称" prop="problemName">
                                <el-input
                                        v-model="report.problemName"
                                        placeholder="请输入题目名称"
                                        autocomplete="off"
                                        :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="OJ" prop="ojId">
                                <el-select
                                        v-model="report.ojId"
                                        placeholder="请选择"
                                        :disabled="true">
                                    <el-option
                                            v-for="item in this.OJList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="网址" prop="problemLink">
                                <el-input
                                        v-model="report.problemLink"
                                        placeholder="请输传送门"
                                        autocomplete="off"
                                        :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="题型" prop="ojId">
                                <div class="block">
                                    <el-cascader
                                            v-model="report.problemTypeId"
                                            clearable
                                            placeholder="试试搜索：STL"
                                            :options="competitionProblemTypeList"
                                            filterable
                                            :disabled="true"></el-cascader>
                                </div>
                            </el-form-item>
                            <el-row :gutter="10" type="flex" justify="center">
                                <el-button
                                        v-if="this.status>1"
                                        type="primary"
                                        @click="lastStep"
                                        round>上一步
                                </el-button>
                                <el-button
                                        v-if="this.status<5"
                                        type="primary"
                                        @click="nextStep"
                                        round>下一步
                                </el-button>
                            </el-row>
                        </el-form>
                    </el-card>
                    <HotReport :reportHotList="this.reportHotList" style="margin-top: 10px"/>
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <h2>{{ this.report.name }}</h2>
                        <div style="margin: 15px 0px">
                            <h3><i class="iconfont el-icon-third-user"
                                   style="font-size: 20px; margin-right: 5px"></i>{{ this.report.userName }}</h3>
                        </div>
                        <span>
                            <i class="iconfont el-icon-third-time-circle"></i>
                            {{ this.report.time }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-eye"/>
                            {{ this.report.visitCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-like"/>
                            {{ this.report.clickCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-heart"/>
                            {{ this.report.storeCounter }}
                        </span>
                        <el-divider></el-divider>
                        <div class="blog-content markdown-body" v-dompurify-html="this.reportContent"></div>
                    </el-card>
                    <!--评论内容-->
                    <el-card class="box-card" style="margin-top: 15px">
                        <comment :comments="commentData"
                                 :reportId="this.$route.query.reportId"
                                 @getReportCommentByReportId="getReportCommentByReportId"/>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--底部-->
        <div class="blog-footer">
            <div style="width: 80%; margin: 0px auto">
                <el-row :gutter="20" style="margin: 10px auto">
                    <el-col :offset="6" :span="18">
                        <el-input
                                v-model="buttonComment"
                                placeholder="请输入内容"
                                suffix-icon="el-icon-edit"
                                @input="buttonCommentFlagTrue"
                                style="width: 300px;"/>
                        <span v-if="this.buttonCommentFlag==true">
                            <el-button
                                    icon="el-icon-close"
                                    size="small"
                                    style="margin-left: 15px"
                                    @click="buttonCommentFlagFalse"
                                    circle/>
                            <el-button type="primary"
                                       icon="el-icon-check"
                                       size="small"
                                       @click="submitButtonComment"
                                       circle/>
                        </span>
                        <el-link
                                :underline="false"
                                style="margin-left: 20px"
                                @click="click">
                            <div :class="{ 'click' : clickFlag }">
                                <i class="iconfont el-icon-third-like" style="font-size: 20px"/>
                                {{ this.report.clickCounter }}
                            </div>
                        </el-link>
                        <el-link
                                :underline="false"
                                style="margin-left: 15px"
                                @click="beforeStore">
                            <div :class="{ 'store' : storeFlag }">
                                <i class="iconfont el-icon-third-heart" style="font-size: 20px"/>
                                {{ this.report.storeCounter }}
                            </div>
                        </el-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <store :user-store-folder="this.userStoreFolder"
               :store-dialog-visible="this.storeDialogVisible"
               @storeDialogVisibleFalse="storeDialogVisibleFalse"
               @store="store"/>
    </div>
</template>

<script>
    import {
        getStatisticsByReportId,
        click,
        getClickByReportIdAndUserId,
        getContentByReportId,
        insertReportUserView,
        insertReportComment,
        getReportCommentByReportId,
        listOnlineJudgeSystem,
        getHotReportByUserId
    } from '@/network/api/report'
    import {
        getUserStoreByReportIdAndUserId,
        createUserStore,
        getUserStoreFolder,
        deleteUserStore
    } from '@/network/api/user'
    import {getUserExtByUserId} from "@/network/api/user";
    import {listCompetitionProblemTypeWithChildren} from '@/network/api/competition'
    import UserStatisticsInfo from "@/views/blog/components/UserStatisticsInfo";
    import Comment from "@/views/report/components/Comment";
    import Store from "@/views/blog/components/Store";
    import HotReport from "@/component/HotReport";

    export default {
        name: "Info",
        components: {
            UserStatisticsInfo,
            Comment,
            Store,
            HotReport
        },
        data() {
            return {
                report: {},
                reportContent: {},
                userExt: {},
                input: '',
                commentData: [],
                showItemId: false,
                clickFlag: false,
                storeFlag: false,
                userStore: '',
                userStoreParentId: '',
                userStoreFolder: [],
                storeDialogVisible: false,
                reportHotList: [],
                buttonComment: '',
                buttonCommentFlag: false,
                OJList: [],
                competitionProblemTypeList: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getStatisticsByReportId(this.$route.query.reportId);
                this.getHotReportByUserId(this.$store.state.user.userId);
            },
            //判断是否仅自己可见
            isPrivate() {
                if (this.report.showFlag == 0) {
                    if (this.report.userId != this.$store.state.user.userId) {
                        this.$message.error("请用发布账号登录");
                        return this.$router.push('/blog');
                    }
                }
                //是本人登录，进行初始化
                this.afterInit()
            },
            //判断是否管理员限制浏览
            isAdminPrivate() {
                if (this.report.adminShowFlag == 0) {
                    this.$message.error("报告涉及违规内容，以限制浏览");
                    return this.$router.push('/home')
                }
                this.isPrivate()
            },
            afterInit() {
                this.getUserExtByUserId(this.report.userId);
                this.getContentByReportId(this.report.reportId);
                this.getClickByReportIdAndUserId();
                this.getUserStoreByReportIdAndUserId();
                this.insertReportUserView();
                this.isDraft();
                this.isGarbage();
                // this.getHotBlogByUserId(this.report.userId);
                this.getReportCommentByReportId(this.report.reportId)
                this.listOnlineJudgeSystem()
                this.listCompetitionProblemTypeWithChildren()
            },
            isDraft() {
                if (this.report.status == 1) {
                    if (this.report.userId == this.$store.state.user.userId) {
                        this.$message.info("此博客还在草稿状态");
                    }
                }
            },
            isGarbage() {
                if (this.report.garbageFlag == 1) {
                    this.$message.info("此博客已被博主移至回收站，随时可能删除");
                }
            },
            //获取博客数据
            getStatisticsByReportId(reportId) {
                getStatisticsByReportId(reportId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    if (res.data == null) {
                        return this.$message.info("博客已被博主删除");
                    }
                    this.report = res.data;
                    //判断是否管理员限制浏览
                    this.isAdminPrivate()
                })
            },
            //获取博客内容
            getContentByReportId(reportId) {
                getContentByReportId(reportId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.report = res.data;
                    this.reportContent = res.data.content
                })
            },
            //插入浏览记录
            insertReportUserView() {
                if (this.$store.state.user.userId == "") {
                    return;
                }
                const reportUserView = {
                    reportId: this.$route.query.reportId,
                    userId: this.$store.state.user.userId
                }
                insertReportUserView(reportUserView).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                })
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
            //点赞
            click() {
                if (this.$store.state.user.userId == "") {
                    return this.$message.info("请先登录");
                }
                const reportUserClick = {
                    reportId: this.$route.query.reportId,
                    userId: this.$store.state.user.userId
                }
                click(reportUserClick).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    if (this.clickFlag == true) {
                        this.report.clickCounter -= 1;
                        this.userExt.clickCounter -= 1;
                        this.clickFlag = false;
                    } else {
                        this.report.clickCounter += 1;
                        this.userExt.clickCounter += 1;
                        this.clickFlag = true;
                    }
                    this.getClickByReportIdAndUserId()
                })
            },
            //查询用户是否点赞
            getClickByReportIdAndUserId() {
                const reportUserClick = {
                    reportId: this.$route.query.reportId,
                    userId: this.$store.state.user.userId
                }
                getClickByReportIdAndUserId(reportUserClick).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.clickFlag = res.data
                })
            },
            //判断是否收藏过
            beforeStore() {
                if (this.$store.state.user.userId == "") {
                    return this.$message.info("请先登录");
                }
                if (this.storeFlag == true) {
                    const userStore = {
                        id: this.userStore.id,
                        reportId: this.$route.query.reportId,
                        reportFlag: 1,
                        blogFlag: 0,
                        folderFlag: 1,
                    }
                    deleteUserStore(userStore).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.report.storeCounter -= 1;
                        this.getUserStoreByBlogIdAndUserId();
                    })
                } else {
                    this.storeDialogVisibleTrue()
                }
            },
            //打开dialog
            storeDialogVisibleTrue() {
                this.storeDialogVisible = true;
                this.getUserStoreFolder();
            },
            storeDialogVisibleFalse() {
                this.storeDialogVisible = false;
            },
            //获取收藏夹
            getUserStoreFolder() {
                const userStore = {
                    userId: this.$store.state.user.userId,
                    folderFlag: 0,
                }
                getUserStoreFolder(userStore).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.userStoreFolder = res.data
                })
            },
            //收藏
            store(id) {
                const userStore = {
                    userId: this.$store.state.user.userId,
                    reportId: this.$route.query.reportId,
                    reportFlag: 1,
                    blogFlag: 0,
                    folderFlag: 1,
                    parentId: id,
                    showFlag: 1,
                }
                createUserStore(userStore).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    this.report.storeCounter += 1;
                    this.userExt.storeCounter += 1;
                    this.getUserStoreByReportIdAndUserId()
                    this.storeDialogVisibleFalse()
                })
            },
            //查询用户是否收藏
            getUserStoreByReportIdAndUserId() {
                const userStore = {
                    reportId: this.$route.query.reportId,
                    userId: this.$store.state.user.userId
                }
                getUserStoreByReportIdAndUserId(userStore).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    if (res.data != null) {
                        this.userStore = res.data
                        this.storeFlag = true
                    } else {
                        this.storeFlag = false
                    }
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
            //获取评论
            getReportCommentByReportId(reportId) {
                getReportCommentByReportId(reportId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].reply == null) {
                            res.data[i].reply = []
                        }
                    }
                    this.commentData = res.data
                })
            },
            buttonCommentFlagFalse() {
                this.buttonCommentFlag = false;
            },
            buttonCommentFlagTrue() {
                this.buttonCommentFlag = true;
            },
            submitButtonComment() {
                const reportComment = {
                    reportId: this.$route.query.reportId,
                    fromUserId: this.$store.state.user.userId,
                    comment: this.buttonComment
                }
                insertReportComment(reportComment).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.buttonComment = '';
                    this.buttonCommentFlag = false;
                    this.getReportCommentByReportId(this.$route.query.reportId)
                })
            },
            //获取OJ系统
            listOnlineJudgeSystem() {
                const onlineJudge = {
                    showFlag: 1
                };
                listOnlineJudgeSystem(onlineJudge).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.OJList.push({value: res.data[i].id, label: res.data[i].name})
                    }
                })
            },
            //获取比赛题型
            listCompetitionProblemTypeWithChildren() {
                const competitionProblemType = {
                    parentId: 0,
                    showFlag: 1
                }
                listCompetitionProblemTypeWithChildren(competitionProblemType).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.competitionProblemTypeList = res.data
                })
            },
        }
    }
</script>

<style scoped>
    .blog-container {
        width: 85%;
        margin: 0px auto;
        margin-bottom: 80px;
    }

    .blog-footer {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background: #fff;
        box-shadow: 0px 0px 1px #909399;
    }

    .title {
        color: #409EFF;
    }

    .click {
        color: #409EFF;
    }

    .store {
        color: #F56C6C;
    }
</style>