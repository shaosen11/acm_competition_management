<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
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
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="organizationQuery" size="small" label-width="100px">
                    <el-form-item label="选择年级：">
                        <el-select v-model="organizationQuery.year" placeholder="请选择">
                            <el-option
                                v-for="item in this.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="organizationQuery.name"
                                  placeholder="班级名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>比赛</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateCompetition">
                    <i class="el-icon-plus"></i>创建比赛
                </el-button>
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                border
                style="width: 100%">
                <!--                <el-table-column type="selection" width="60" align="center"></el-table-column>-->
                <el-table-column
                    prop="competitionName"
                    label="名称"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始时间"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="比赛地点"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="registrationTime"
                    label="报名结束时间"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <p>团队报名：
                            <el-switch
                                @change="handleTeamFlagStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.teamFlag">
                            </el-switch>
                        </p>
                        <p>个人报名：
                            <el-switch
                                @change="handlePersonFlagStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.singleFlag">
                            </el-switch>
                        </p>
                        <p>截止报名：
                            <el-switch
                                @change="handleRegistrationFlagStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.registrationFlag">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="详情"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="toCompetitionInfo(scope.row)"
                            round>查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="organizationQuery.pageNum"
                    :page-sizes="[5,10,15]"
                    :page-size="organizationQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import {getCompetitionList, updateCompetition} from '@/network/api/competition'

const defaultOrganizationQuery = {
    year: '',
    name: '',
    pageNum: 1,
    pageSize: 5,
};

export default {
    name: "List",
    data() {
        return {
            //队伍查询条件
            organizationQuery: {
                year: '',
                name: '',
                pageNum: 1,
                pageSize: 5,
            },
            competitionQuery:{
                pageNum: 1,
                pageSize: 5,
            },
            options: [],
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            value: true
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
            getCompetitionList(this.competitionQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                console.log(res.data.list)
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.totalPage = res.data.totalPage;
                this.competitionQuery.pageNum = res.data.pageNum;
                this.competitionQuery.pageSize = res.data.pageSize;
                if (this.total > this.competitionQuery.pageSize) {
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.organizationQuery.pageNum = 1;
            this.organizationQuery.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.organizationQuery.pageNum = val;
            this.getList();
        },
        //跳转比赛信息
        toCompetitionInfo(competition){
            this.$router.push({
                name: 'competitionInfo',
                query: {
                    competitionId: competition.competitionId
                }
            })
        },
        toCreateCompetition() {
            this.$router.push("/admin/createCompetition")
        },
        //点击搜索按钮
        handleSearchList() {
            this.organizationQuery.pageNum = 1;
            this.getList();
        },
        //点击重置按钮
        handleResetSearch() {
            this.organizationQuery = Object.assign({}, defaultOrganizationQuery);
        },
        //处理是否团队报名
        handleTeamFlagStatusChange(row){
            const competition = {
                id: row.id,
                teamFlag: row.teamFlag
            }
            updateCompetition(competition).then(res =>{
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getList()
            })
        },
        //处理是否个人报名
        handlePersonFlagStatusChange(row){
            const competition = {
                id: row.id,
                singleFlag: row.singleFlag
            }
            updateCompetition(competition).then(res =>{
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getList()
            })
        },
        //处理是否截止报名
        handleRegistrationFlagStatusChange(row) {
            const competition = {
                id: row.id,
                registrationFlag: row.registrationFlag
            }
            updateCompetition(competition).then(res =>{
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getList()
            })
        },
    }
}
</script>

<style scoped>
.table-container, .pagination-container {
    margin: 30px auto;
}
</style>