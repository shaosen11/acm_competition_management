<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>队伍</el-breadcrumb-item>
            <el-breadcrumb-item>队伍列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="never" style="margin-top: 30px">
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
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="teamQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="teamQuery.name" placeholder="队伍名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="队伍人数：">
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

        <el-row :gutter="20" justify="center">
            <el-col :span="8" v-for="(team, index) in this.tableData" :key="index" style="margin-top: 15px">
                <el-card shadow="hover">
                    <el-row>
                        <el-col :span="18">
                            <div>
                                <span>队名：</span>
                                <span class="name"
                                                      @click="toTeamInfo(team.name)">{{name(team)|ellipsis}}</span>
                            </div>
                            <div>
                                <span>队长：</span>
                                <span class="name"
                                                      @click="toUserInfo(team.userId)">{{team.userName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div style="text-align: center">
                                <el-button type="primary" size="mini" round>申请加入</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <UserRadar
                            :user-radar="userRadar[index]"
                            :ref='"userRadar_" + index'/>
                </el-card>
            </el-col>
        </el-row>
        <div class="pagination-container" style="float: right;">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="teamQuery.pageNum"
                    :page-sizes="[3,6]"
                    :page-size="teamQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getTeamList, applyJoinTeam} from '@/network/api/team';
    import UserRadar from "@/component/UserRadar";

    export default {
        name: "List",
        components: {
            UserRadar
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
                    pageSize: 3,
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
                    userCount: '',
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
                //是否正在加入
                joinButtonLoading: false,
                userRadar: {},
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
                    let cloumn = [];
                    for (let i = 0; i < this.tableData.length; i++) {
                        cloumn[i] = []
                        const teamRadar = this.tableData[i].userRadars;
                        for (let j = 0; j < teamRadar.length; j++) {
                            const rows = [
                                teamRadar[j].problemTypeOne,
                                teamRadar[j].problemTypeTwo,
                                teamRadar[j].problemTypeThree,
                                teamRadar[j].problemTypeFour,
                                teamRadar[j].problemTypeFive,
                                teamRadar[j].problemTypeSix,
                                teamRadar[j].problemTypeSeven,
                                teamRadar[j].problemTypeEight,
                            ]
                            cloumn[i][j] = rows
                        }
                    }
                    this.userRadar = cloumn;
                    // for (let i = 0; i < this.userRadar.length; i++) {
                    //     var name = "userRadar_" + i
                    //     // this.$refs[name][i].init()
                    //     console.log( )
                    //     if (this.$refs[name]!=null){
                    //         this.$refs[name][0].init()
                    //     }
                    // }
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
            toCreateTeam() {
                this.$router.push("/teamCreate")
            },
            //申请加入队伍
            applyJoinTeam(teamId) {
                if (this.$store.state.user.userId == '') {
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
            name(team) {
                if (team.englishName != null && team.englishName != '') {
                    return team.name + " (" + team.englishName + ")"
                }
                return team.name
            }
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 15) {
                    return value.slice(0, 15) + '...'
                }
                return value
            },
        }
    }
</script>

<style scoped>

    .name {
        font-size: 16px;
        font-weight: 500;
    }

    .name:hover {
        color: #409EFF;
    }

    .pagination-container{
        margin-top: 15px;
    }
</style>