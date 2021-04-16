<template>
    <div>
        <div class="blog-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <!--用户信息-->
                    <user-statistics-info
                        :user-ext="userExt"
                        :follow-flag="followFlag"
                        :follow-show-flag="followShowFlag"
                        @follow="follow"
                        @cancelFollow="cancelFollow"/>
                    <el-card class="box-card" style="margin-top: 10px">
                        <div slot="header">
                            <span>题目信息</span>
                        </div>
                        <el-form :model="report" label-width="50px">
                            <el-form-item label="原文" prop="link">
                                <el-link type="primary" :underline="false">
                                    <span @click="toUrl(report.link)">{{ report.link|ellipsis }}</span>
                                </el-link>
                            </el-form-item>
                            <el-form-item label="题目" prop="problemName">
                                <span>{{ report.problemName }}</span>
                            </el-form-item>
                            <el-form-item label="网址" prop="problemLink">
                                <el-link type="primary" :underline="false">
                                    <span @click="toUrl(report.problemLink)">{{ report.problemLink|ellipsis }}</span>
                                </el-link>
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
                        </el-form>
                    </el-card>
                    <!--热门报告-->
                    <HotReport :reportHotList="this.reportHotList" style="margin-top: 10px"/>
                    <el-card style="margin-top: 10px">
                        能力图
                        <div class="onePxDivider"></div>
                        <UserRadar
                            :user-radar="userRadar"
                            ref="userRadar"/>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <h2>{{ this.report.name }}</h2>
                        <span>
                            <i class="iconfont el-icon-third-edit" style="margin-right: 5px"/>
                            <span>编辑于 </span>
                            {{ this.report.time }}
                            <el-divider direction="vertical"></el-divider>
                            <span>by </span>
                            <span class="userName" v-dompurify-html="this.report.userName"/>
                        </span>
                        <el-divider direction="vertical"></el-divider>
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
<!--                    <mavon-editor-->
<!--                            class="md"-->
<!--                            :value="this.reportContent"-->
<!--                            :subfield="false"-->
<!--                            :defaultOpen="'preview'"-->
<!--                            :toolbarsFlag="true"-->
<!--                            :editable="false"-->
<!--                            :scrollStyle="true"-->
<!--                            :ishljs="true"-->
<!--                            :navigation="false"-->
<!--                            :toolbars="toolbars"-->
<!--                            style="margin-top: 10px"/>-->
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
    deleteUserStore,
    follow,
    cancelFollow,
    getByUserIdAndFollowUserId,
    getUserExtByUserId,
    getUserRadarByUserId
} from '@/network/api/user'
import {listCompetitionProblemTypeWithChildren} from '@/network/api/competition'
import UserStatisticsInfo from "@/component/UserStatisticsInfo";
import Comment from "@/views/report/components/Comment";
import Store from "@/component/Store";
import HotReport from "@/component/HotReport";
import UserRadar from "@/component/UserRadar";

export default {
    name: "Info",
    components: {
        UserStatisticsInfo,
        Comment,
        Store,
        HotReport,
        UserRadar
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
            competitionProblemTypeList: [],
            followFlag: false,
            followShowFlag: true,
            toolbars: {
                bold: false, // 粗体
                italic: false, // 斜体
                header: false, // 标题
                underline: false, // 下划线
                strikethrough: false, // 中划线
                mark: false, // 标记
                superscript: false, // 上角标
                subscript: false, // 下角标
                quote: false, // 引用
                ol: false, // 有序列表
                ul: false, // 无序列表
                link: false, // 链接
                imagelink: false, // 图片链接
                code: false, // code
                table: false, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: false, // 帮助
                /* 1.3.5 */
                undo: false, // 上一步
                redo: false, // 下一步
                trash: false, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: false, // 左对齐
                aligncenter: false, // 居中
                alignright: false, // 右对齐
                /* 2.2.1 */
                subfield: false, // 单双栏模式
                preview: false, // 预览
            },
            userRadar:[]
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载',
            });
            this.getStatisticsByReportId(this.$route.query.reportId);
            this.getHotReportByUserId(this.$store.state.user.userId);
            loading.close()
        },
        //判断是否仅自己可见
        isPrivate() {
            if (this.report.showFlag == 0) {
                if (this.report.userId != this.$store.state.user.userId) {
                    this.$message.info("请用发布账号登录");
                    return this.$router.push('/search');
                }
            }
            //是否处于草稿状态
            this.isDraft();
        },
        //判断是否管理员限制浏览
        isAdminPrivate() {
            if (this.report.adminShowFlag == 0) {
                if (this.report.userId == this.$store.state.user.userId) {
                    this.$message.error("报告涉及违规内容，已限制浏览，请联系管理员");
                } else {
                    this.$message.error("报告涉及违规内容，已限制浏览");
                    return this.$router.push('/search')
                }
            }
            this.isPrivate()
        },
        afterInit() {
            this.getUserExtByUserId(this.report.userId);
            this.getContentByReportId(this.report.reportId);
            this.getClickByReportIdAndUserId();
            this.getUserStoreByReportIdAndUserId();
            this.insertReportUserView();
            this.isGarbage();
            this.getReportCommentByReportId(this.report.reportId);
            this.listOnlineJudgeSystem();
            this.listCompetitionProblemTypeWithChildren();
            this.getByUserIdAndFollowUserId();
            this.getUserRadarByUserId(this.report.userId);
        },
        isDraft() {
            if (this.report.status == 1) {
                if (this.report.userId == this.$store.state.user.userId) {
                    this.$message.info("此报告还在草稿状态");
                } else {
                    this.$message.info("此报告还未发布");
                    return this.$router.push('/search')
                }
            }
            //是本人登录，进行初始化
            this.afterInit()
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
        toUrl(url) {
            window.open(url, "_blank");
        },
        getByUserIdAndFollowUserId() {
            const userFollow = {
                followUserId: this.report.userId,
                userId: this.$store.state.user.userId,
            }
            getByUserIdAndFollowUserId(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.followFlag = res.data
            })
        },
        follow(userFollow) {
            follow(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
                this.followFlag = true
            })
        },
        cancelFollow(userFollow) {
            cancelFollow(userFollow).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
                this.followFlag = false
            })
        },
        getUserRadarByUserId(userId) {
            getUserRadarByUserId(userId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                res.data.name = this.userExt.userName
                this.userRadar.push(res.data);
                this.$refs.userRadar.init();
            })
        }
    },
    filters: {
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 25) {
                return value.slice(0, 25) + '...'
            }
            return value
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