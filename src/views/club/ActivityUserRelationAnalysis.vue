<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toActivity" content="报名数据分析">
                </el-page-header>
            </div>
            <el-row :gutter="20">
                <div style="margin: 30px auto">
                    <el-col :span="12">
                        <h4>团队/个人报名情况</h4>
                        <ve-histogram :data="chartData"></ve-histogram>
                    </el-col>
                    <el-col :span="12">
                        <h4>年级总报名人数</h4>
                        <ve-pie :data="lineData"></ve-pie>
                    </el-col>
                    <el-col :span="24">
                        <h4>班级报名情况</h4>
                        <ve-histogram :data="organizationData"></ve-histogram>
                    </el-col>
                </div>
            </el-row>
        </el-card>
        <el-card class="table-container" style="margin-top: 15px">
            <div slot="header" class="clearfix">
                <span>报名列表</span>
            </div>
            <el-table
                    v-loading="listLoading"
                    element-loading-text="努力加载中..."
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="userId"
                        label="用户id"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)" :underline="false">
                            <span>{{ scope.row.userName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="organization"
                        label="班级"
                        width="250"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toOrganizationInfo(scope.row)" :underline="false">
                            <span>{{ scope.row.year }}{{ scope.row.organizationName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="报名时间"
                        width="250"
                        align="center">
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="clubActivityUserRelationQueryParam.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="clubActivityUserRelationQueryParam.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        listChartByActivityId,
        listOrganizationByActivityId,
        listClubActivityUserRelationDto
    } from '@/network/api/club'

    export default {
        name: "ActivityUserRelationAnalysis",
        data() {
            return {
                competition: {},
                chartData: {
                    columns: ["年级", "报名人数"],
                    rows: []
                },
                lineData: {
                    columns: ["年级", "报名人数"],
                    rows: []
                },
                organizationData: {
                    columns: ["班级", "报名人数"],
                    rows: []
                },
                //查询条件
                clubActivityUserRelationQueryParam: {
                    activityId: this.$route.query.activityId,
                    pageNum: 1,
                    pageSize: 5,
                },
                //报名列表
                competitionUserRelationList: [],
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
            };
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.listChartByActivityId(this.$route.query.activityId)
                this.listOrganizationByActivityId(this.$route.query.activityId)
                this.getList()
            },
            listChartByActivityId(activityId){
                listChartByActivityId(activityId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.chartData.rows.push({
                            "年级": res.data[i].year,
                            "报名人数": res.data[i].count,
                        })
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.lineData.rows.push({"年级": res.data[i].year, "报名人数": res.data[i].count})
                    }
                })
            },
            listOrganizationByActivityId(activityId) {
                listOrganizationByActivityId(activityId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.organizationData.rows.push({
                            "班级": res.data[i].year + res.data[i].name,
                            "报名人数": res.data[i].count
                        })
                    }
                })
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                listClubActivityUserRelationDto(this.clubActivityUserRelationQueryParam).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.clubActivityUserRelationQueryParam.pageNum = res.data.pageNum;
                    this.clubActivityUserRelationQueryParam.pageSize = res.data.pageSize;
                    if (this.total > this.clubActivityUserRelationQueryParam.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.clubActivityUserRelationQueryParam.pageNum = 1;
                this.clubActivityUserRelationQueryParam.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.clubActivityUserRelationQueryParam.pageNum = val;
                this.getList();
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId}})
            },
            toTeamInfo(teamName) {
                this.$router.push({name: 'teamInfo', query: {teamName}})
            },
            toOrganizationInfo(organization) {
                this.$router.push({
                    name: 'organizationInfo',
                    query: {
                        year: organization.year,
                        name: organization.organizationName
                    }
                })
            },
            toActivity(){
                this.$router.push('/club')
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }

    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>