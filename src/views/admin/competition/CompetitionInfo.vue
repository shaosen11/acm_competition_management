<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toCompetitionList" content="报名数据分析">
                </el-page-header>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    团队报名数量：{{this.competition.teamNumber}}
                </el-col>
                <el-col :span="12">
                    个人报名数量：{{this.competition.userNumber}}
                </el-col>
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
                        prop="singleFlag"
                        label="是否个人报名"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-if="scope.row.singleFlag==1"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)" :underline="false">
                            <span>{{scope.row.userName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teamFlag"
                        label="是否团队报名"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-check" v-if="scope.row.teamFlag==1"></i>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teamName"
                        label="团队名"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toTeamInfo(scope.row.teamName)" :underline="false">
                            <span>{{scope.row.teamName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="报名时间"
                        width="200"
                        align="center">
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="competitionUserRelationQueryParam.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="competitionUserRelationQueryParam.pageSize"
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
        listChartByCompetitionId,
        listOrganizationByCompetitionId,
        getCompetitionByCompetitionId,
        listCompetitionUserRelation
    } from '@/network/api/competition'

    export default {
        name: "CompetitionInfo",
        data() {
            return {
                competition: {},
                chartData: {
                    columns: ["年级", "个人报名人数", "团队报名人数"],
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
                competitionUserRelationQueryParam: {
                    competitionId: this.$route.query.competitionId,
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
                this.listChartByCompetitionId(this.$route.query.competitionId)
                this.listOrganizationByCompetitionId(this.$route.query.competitionId)
                this.getCompetitionByCompetitionId(this.$route.query.competitionId)
                this.getList()
            },
            listChartByCompetitionId(competitionId) {
                listChartByCompetitionId(competitionId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.chartData.rows.push({
                            "年级": res.data[i].year,
                            "个人报名人数": res.data[i].singleCount,
                            "团队报名人数": res.data[i].teamCount
                        })
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.lineData.rows.push({"年级": res.data[i].year, "报名人数": res.data[i].count})
                    }
                })
            },
            listOrganizationByCompetitionId(competitionId){
                listOrganizationByCompetitionId(competitionId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.organizationData.rows.push({"班级": res.data[i].year+res.data[i].name, "报名人数": res.data[i].count})
                    }
                })
            },
            //获取比赛信息
            getCompetitionByCompetitionId(competitionId) {
                const competition = {
                    competitionId
                }
                getCompetitionByCompetitionId(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.competition = res.data
                })
            },
            //去比赛列表
            toCompetitionList() {
                this.$router.push("/admin/competitionList")
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                listCompetitionUserRelation(this.competitionUserRelationQueryParam).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.competitionUserRelationQueryParam.pageNum = res.data.pageNum;
                    this.competitionUserRelationQueryParam.pageSize = res.data.pageSize;
                    if (this.total > this.competitionUserRelationQueryParam.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.competitionUserRelationQueryParam.pageNum = 1;
                this.competitionUserRelationQueryParam.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.competitionUserRelationQueryParam.pageNum = val;
                this.getList();
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId}})
            },
            toTeamInfo(teamName) {
                this.$router.push({name: 'teamInfo', query: {teamName}})
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