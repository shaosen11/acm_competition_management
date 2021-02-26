<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="iconfont el-icon-third-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="handleSearchList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
                <el-button
                        style="float: right;margin-right: 15px"
                        @click="handleResetSearch()"
                        size="small">
                    重置
                </el-button>

            </div>
            <div style="margin-top: 30px">
                <el-form :inline="true" :model="reportQuery" size="small" label-width="120px">
                    <el-form-item label="报告id：">
                        <el-input style="width: 203px" v-model="reportQuery.reportId" placeholder="报告id"></el-input>
                    </el-form-item>
                    <el-form-item label="报告名称：">
                        <el-input style="width: 203px" v-model="reportQuery.name" placeholder="报告名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发布者id：">
                        <el-input style="width: 203px" v-model="reportQuery.userId" placeholder="发布者id"></el-input>
                    </el-form-item>
                    <el-form-item label="发布者名称：">
                        <el-input style="width: 203px" v-model="reportQuery.userName" placeholder="发布者名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" prop="time">
                        <div class="block">
                            <el-date-picker
                                    v-model="reportQuery.time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否限制浏览：">
                        <el-select v-model="reportQuery.adminShowFlag" placeholder="请选择">
                            <el-option
                                    v-for="item in this.adminShowFlagList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>报告列表</span>
            </div>
            <el-table
                    v-loading="listLoading"
                    element-loading-text="努力加载中..."
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="reportId"
                        label="博客Id"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="博客名称"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toReport(scope.row.reportId)" :underline="false">
                            {{ scope.row.name }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="发布时间"
                        width="110"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="学号"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)" :underline="false">
                            {{ scope.row.userName }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="数据"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <p>浏览量：
                            {{scope.row.visitCounter}}
                        </p>
                        <p>点赞量：
                            {{scope.row.clickCounter}}
                        </p>
                        <p>点赞量：
                            {{scope.row.storeCounter}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <p>是否限制浏览：
                            <el-switch
                                    @change="handleAdminShowFlagChange(scope.row)"
                                    :active-value="0"
                                    :inactive-value="1"
                                    v-model="scope.row.adminShowFlag">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
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
    </div>
</template>

<script>
    import {listReportPage, updateReport} from "@/network/api/report";

    export default {
        name: "Report",
        data() {
            return {
                //查询全部
                reportQuery: {
                    reportId: '',
                    name: '',
                    userId: '',
                    userName: '',
                    status: '',
                    showFlag: '',
                    adminShowFlag: '',
                    garbageFlag: '',
                    pageNum: 1,
                    pageSize: 5,
                    time: '',
                    startTime: '',
                    endTime: ''
                },
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
                //是否展示
                adminShowFlagList: [
                    {
                        value: 0,
                        label: '限制',
                    },
                    {
                        value: 1,
                        label: '不限制',
                    }
                ],
            }
        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getList();
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                this.reportQuery.startTime = this.reportQuery.time[0];
                this.reportQuery.endTime = this.reportQuery.time[1];
                listReportPage(this.reportQuery).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    console.log(res.data.list)
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
            //跳转用户信息
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId: userId}});
            },
            toReport(reportId){
                this.$router.push({
                    name: 'reportInfo',
                    query: {reportId}
                })
            },
            //点击搜索按钮
            handleSearchList() {
                this.reportQuery.pageNum = 1;
                this.getList();
            },
            //点击重置按钮
            handleResetSearch() {
                this.reportQuery.reportId = '';
                this.reportQuery.name = '';
                this.reportQuery.userId = '';
                this.reportQuery.userName = '';
                this.reportQuery.showFlag = '';
                this.reportQuery.adminShowFlag = '';
                this.reportQuery.time = '';
                this.reportQuery.startTime = '';
                this.reportQuery.endTime = '';
            },

            //处理是否显示
            handleAdminShowFlagChange(row) {
                const report = {
                    reportId: row.reportId,
                    adminShowFlag: row.adminShowFlag,
                }
                updateReport(report).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList();
                    return this.$message.success(res.message);
                })
            },
        },
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>