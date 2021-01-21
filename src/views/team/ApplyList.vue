<template>
    <div class="app-container">
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>申请列表</span>
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="userId"
                    label="学号"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="姓名"
                    width="100"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)">{{ scope.row.userName }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="year"
                    label="年级"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="organizationName"
                    label="班级"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="申请时间"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="agreeJoin(scope.row)"
                            round>同意申请
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5,10,15]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import {getTeamUserCooperationListByTeamName, agreeJoinTeam} from '@/network/api/team'

export default {
    name: "ApplyList",
    data() {
        return {
            //队伍查询条件
            teamUserCooperationQueryParam: {
                teamName: null,
                pageNum: 1,
                pageSize: 10,
            },
            pageNum: 1,
            pageSize: 10,
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
        this.init()
    },
    methods: {
        init() {
            this.getList()
        },
        //获取表单信息
        getList() {
            this.listLoading = true
            this.teamUserCooperationQueryParam.teamName = this.$store.state.team.teamName
            getTeamUserCooperationListByTeamName(this.teamUserCooperationQueryParam).then(res => {
                if (res.code != 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.totalPage = res.data.totalPage;
                this.pageNum = res.data.pageNum;
                this.pageSize = res.data.pageSize;
                if (this.total > this.pageSize) {
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.pageNum = 1;
            this.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        //跳转团队信息
        toTeamInfo(teamName) {
            this.$router.push({name: 'team', query: {teamName: teamName}})
        },
        //跳转用户信息
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        },
        //跳转班级信息
        toOrganizationInfo() {
            this.$router.push({
                name: 'organizationInfo',
                query: {
                    year: this.$route.query.year,
                    name: this.$route.query.name,
                }
            })
        },
        //同意加入
        agreeJoin(row){
            agreeJoinTeam(row.id).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.init()
            })
        },
    }
}
</script>

<style scoped>
.table-container {
    width: 1000px;
}
</style>