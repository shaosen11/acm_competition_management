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
                <el-form :inline="true" :model="teamQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="teamQuery.name" placeholder="队伍名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="选择队伍人数：">
                        <el-select v-model="teamQuery.userCount" placeholder="请选择">
                            <el-option
                                v-for="item in teamQuery.options"
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
                <span>队伍列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateTeam"><i
                    class="el-icon-plus"></i>创建队伍
                </el-button>
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="队伍名称"
                    width="250"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toTeamInfo(scope.row.name)">{{ scope.row.name }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="队长"
                    width="170"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)">{{ scope.row.userName }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="motto"
                    label="座右铭"
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="userCount"
                    label="当前人数"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="300"
                    align="center">
                    <template slot-scope="scope">
<!--                        <el-button-->
<!--                            v-if="judgeApplyTeam(scope.row)"-->
<!--                            size="mini"-->
<!--                            :disabled="judgeApplyTeam(scope.row)"-->
<!--                            round>正在申请-->
<!--                        </el-button>-->
                        <el-button
                            size="mini"
                            type="primary"
                            @click="applyJoinTeam(scope.row.teamId)"
                            :disabled="scope.row.userCount>=3"
                            round>申请加入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="teamQuery.pageNum"
                    :page-sizes="[5,10,15]"
                    :page-size="teamQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>

        <!--增加页面-->
        <create ref="create"
                :dialogCreateFormVisible="dialogCreateFormVisible"
                :create-button-loading="createButtonLoading"
                @dialogCreateFormVisibleFasle="dialogCreateFormVisibleFasle"
                @createTeam="createTeam"/>
    </div>
</template>

<script>
import {getTeamList, createTeam, applyJoinTeam} from '@/network/api/team';
import Create from "./Create";


export default {
    name: "List",
    components: {
        Create
    },
    created() {
        this.init();
    },
    data() {
        return {
            //队伍查询条件
            teamQuery: {
                name: null,
                pageNum: 1,
                pageSize: 5,
                options: [{
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }],
                userCount: ''
            },
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            //是否展示修改表单
            dialogCreateFormVisible: false,
            //是否正在创建
            createButtonLoading: false,
            //是否正在加入
            joinButtonLoading: false
        }
    },
    methods: {
        //初始化方法
        init() {
            this.getList();
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            getTeamList(this.teamQuery).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.totalPage = res.data.totalPage;
                this.teamQuery.pageNum = res.data.pageNum;
                this.teamQuery.pageSize = res.data.pageSize;
                if (this.total > this.teamQuery.pageSize) {
                    this.isHide = false;
                }
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.teamQuery.pageNum = 1;
            this.teamQuery.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.teamQuery.pageNum = val;
            this.getList();
        },
        //跳转团队信息
        toTeamInfo(teamName) {
            this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
        },
        //跳转用户信息
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        },
        //点击搜索按钮
        handleSearchList() {
            this.teamQuery.pageNum = 1;
            this.getList();
        },
        //点击重置按钮
        handleResetSearch() {
            this.teamQuery.name = '';
            this.teamQuery.userCount = '';
        },
        //隐藏修改表单
        dialogCreateFormVisibleFasle() {
            this.dialogCreateFormVisible = false;
        },
        //显示修改表单
        toCreateTeam() {
            this.dialogCreateFormVisible = true;
        },
        //完成队伍信息填写，跳转页面
        createTeam(team) {
            this.createButtonLoading = true;
            createTeam(team).then(res => {
                if (res.code !== 200) {
                    this.createButtonLoading = false;
                    return this.$message.error(res.message);
                }
                this.createButtonLoading = false;
                this.$router.push({name: 'team', query: {teamName: team.name}})
            })
        },
        //申请加入队伍
        applyJoinTeam(teamId) {
            if (this.$store.state.user.userId==''){
                this.$message.error("请先登录");
                return false;
            }
            const teamUserCooperation = {
                teamId: teamId,
                notInTeamUserId: this.$store.state.user.userId
            }
            applyJoinTeam(teamUserCooperation).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                return this.$message.success(res.message);
            })
        },
        // //判断是否加入的队伍
        // judgeApplyTeam(team){
        //     return team.type==2&&team.finishFlag==1&&team.notInTeamUserId==this.$store.state.user.userId
        // },
    }
}
</script>

<style scoped>
.table-container, .pagination-container {
    margin: 30px auto;
}
</style>