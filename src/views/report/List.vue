<template>
    <div class="big-app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>报告</el-breadcrumb-item>
            <el-breadcrumb-item>我的报告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10" style="margin-top: 30px">
            <el-col :span="6">
                <UserInfo :user-ext="this.userExt"/>
                <HotReport :reportHotList="this.reportHotList" style="margin-top: 10px"/>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-tabs v-model="activeTab" @tab-click="handleClick">
                        <el-tab-pane label="已发布" name="release"/>
                        <el-tab-pane label="所有博客" name="all"/>
                        <el-tab-pane label="草稿箱" name="draft"/>
                        <el-tab-pane label="审核中" name="examine"/>
                        <el-tab-pane label="仅自己可见" name="private"/>
                        <el-tab-pane label="回收站" name="garbage"/>
                    </el-tabs>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <div style="margin: 20px 0px;">
                            <span class="title"
                                  @click="toReport(item.reportId)">
                                {{ item.name }}
                            </span>
                            <el-tag :type="computeTabStatue(item)" style="margin-left: 10px">{{
                                computeStatue(item)
                                }}
                            </el-tag>
                            <el-tag v-if="item.showFlag==0" type="info" style="margin-left: 10px">仅自己可见</el-tag>
                            <el-tag v-if="item.garbageFlag==1" type="danger" style="margin-left: 10px">回收站</el-tag>
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
                            <el-dropdown style="float: right; margin-left: 15px">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="toReport(item.reportId)">
                                        预览
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="toUpdateReport(item.reportId)">
                                        编辑
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="setPublic(item.reportId)" v-if="item.showFlag==0">
                                        所有人可见
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="setPrivate(item.reportId)" v-else>
                                        仅自己可见
                                    </el-dropdown-item>
                                    <el-dropdown-item divided v-if="item.garbageFlag==1"
                                                      @click.native="returnGarbage(item.reportId)">
                                        还原
                                    </el-dropdown-item>
                                    <el-dropdown-item v-if="item.garbageFlag==1"
                                                      @click.native="deleteReport(item.reportId)">
                                        彻底删除
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="setGarbage(item.reportId)" v-else>
                                        移至回收站
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="divider"></div>
                    </div>
                    <div class="pagination-container" style="float: right; margin-bottom: 15px">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="reportQuery.pageNum"
                                :page-sizes="[5,10,15]"
                                :page-size="reportQuery.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                                :hide-on-single-page="isHide">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getUserExtByUserId} from "@/network/api/user";
    import UserInfo from "@/views/blog/components/UserStatisticsInfo";
    import HotReport from "@/component/HotReport";
    import {listReportPage, updateReport, deleteReport, getHotReportByUserId} from "@/network/api/report";

    const defaultReportQuery = {
        status: '',
        showFlag: '',
        garbageFlag: '',
        pageNum: 1,
        pageSize: 5,
    };

    export default {
        name: "List",
        components: {
            UserInfo,
            HotReport
        },
        data() {
            return {
                //默认记过tab
                activeTab: 'release',
                //查询全部
                reportQuery: {
                    userId: this.$store.state.user.userId,
                    status: '',
                    showFlag: '',
                    garbageFlag: '',
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
                userExt: {},
                reportHotList: []
            }
        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getUserExtByUserId(this.$store.state.user.userId);
                this.getList();
                this.getHotReportByUserId(this.$store.state.user.userId);
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
            //获取表单信息
            getList() {
                this.listLoading = true;
                listReportPage(this.reportQuery).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.reportQuery.pageNum = res.data.pageNum;
                    this.reportQuery.pageSize = res.data.pageSize;
                    if (this.total > this.reportQuery.pageSize) {
                        this.isHide = false;
                    } else {
                        this.isHide = true;
                    }
                    this.listLoading = false;
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
            toReport(reportId) {
                this.$router.push({
                    name: 'reportInfo',
                    query: {reportId}
                })
            },
            toUpdateReport(reportId) {
                this.$router.push({
                    name: 'reportCreate',
                    query: {reportId}
                })
            },
            updateReport(report) {
                updateReport(report).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                    return this.$message.success(res.message);
                })
            },

            setPrivate(reportId) {
                const report = {
                    reportId,
                    showFlag: 0
                }
                this.updateReport(report)
            },
            setPublic(reportId) {
                const report = {
                    reportId,
                    showFlag: 1
                }
                this.updateReport(report)
            },
            setGarbage(reportId) {
                const report = {
                    reportId,
                    garbageFlag: 1
                }
                this.updateReport(report)
            },
            returnGarbage(reportId) {
                const report = {
                    reportId,
                    garbageFlag: 0
                }
                this.updateReport(report)
            },
            deleteReport(reportId) {
                deleteReport(reportId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                    return this.$message.success(res.message);
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.reportQuery.pageNum = 1;
                this.reportQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.reportQuery.pageNum = val;
                this.getList();
            },
            //切换tab
            handleClick(tab) {
                this.reportQuery = Object.assign({}, defaultReportQuery);
                this.reportQuery.userId = this.$store.state.user.userId;
                if (tab.name == 'draft') {
                    this.reportQuery.status = 1;
                }
                if (tab.name == 'examine') {
                    this.reportQuery.status = 2;
                }
                if (tab.name == 'release') {
                    this.reportQuery.status = 3;
                }
                if (tab.name == 'private') {
                    this.reportQuery.showFlag = 0;
                }
                if (tab.name == 'garbage') {
                    this.reportQuery.garbageFlag = 1
                }
                this.getList();
            },
            //计算状态
            computeStatue(report) {
                if (report.status == 1) {
                    return "草稿"
                }
                if (report.status == 2) {
                    return "审核中"
                }
                if (report.status == 3) {
                    return "已发布"
                }
            },
            computeTabStatue(report) {
                if (report.status == 1) {
                    return "info"
                }
                if (report.status == 2) {
                    return "warning"
                }
            }
        }
    }
</script>

<style scoped>
    .data {
        color: #909399;
    }

    .title:hover {
        color: #409eff;
        font-size: 16px;
    }
</style>