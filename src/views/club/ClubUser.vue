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
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="userQuery" size="small" label-width="140px">
                    <el-form-item label="学生学号：">
                        <el-input style="width: 203px" v-model="userQuery.userId" placeholder="学生学号"></el-input>
                    </el-form-item>
                    <el-form-item label="学生姓名：">
                        <el-input style="width: 203px" v-model="userQuery.name" placeholder="学生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="选择年级：">
                        <el-select style="width: 203px" v-model="userQuery.year" placeholder="请选择">
                            <el-option
                                    v-for="item in userQuery.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="userQuery.organizationName"
                                  placeholder="班级名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份：">
                        <el-select style="width: 203px" v-model="userQuery.clubFlag" placeholder="请选择">
                            <el-option
                                    v-for="item in userQuery.clubOptions"
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
                <span>会员列表</span>
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
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)">{{ scope.row.userName }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="organization"
                        label="班级"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toOrganizationInfo(scope.row)" :underline="false">
                            <span>{{ scope.row.year }}{{ scope.row.organizationName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="clubFlag"
                        label="身份"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.clubFlag==1">普通会员</span>
                        <span v-else-if="scope.row.clubFlag==2"><i class="iconfont el-icon-third-admin"/>管理员</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.clubFlag==1">
                            <el-button
                                    size="mini"
                                    @click="setAdmin(scope.row.userId)"
                                    round>设为管理员
                            </el-button>
                        </div>
                        <div v-else-if="scope.row.clubFlag==2">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="setCommon(scope.row.userId)"
                                    round>设为普通用户
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="userQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="userQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {listClubUser, updateUserInfo} from '@/network/api/user';
    import {getOrganizationYearList} from '@/network/api/organization';

    export default {
        name: "ClubUser",
        data() {
            return {
                userQuery: {
                    userId: null,
                    name: null,
                    year: '',
                    organizationName: '',
                    clubFlag: '',
                    pageNum: 1,
                    pageSize: 5,
                    options: [],
                    clubOptions: [
                        {
                            value: '1',
                            label: '普通会员'
                        },
                        {
                            value: '2',
                            label: '管理员'
                        }
                    ]
                },
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
                //多选
                multipleSelection: ''
            }
        },
        created() {
            //初始化
            this.init();
        },
        methods: {
            init() {
                this.getList();
                this.getYearList();
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                listClubUser(this.userQuery).then(res => {
                    this.listLoading = false;
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.userQuery.pageNum = res.data.pageNum;
                    this.userQuery.pageSize = res.data.pageSize;
                    if (this.total > this.userQuery.pageSize) {
                        this.isHide = false;
                    }
                })
            },
            //获取年级信息
            getYearList() {
                getOrganizationYearList().then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.userQuery.options.push({value: res.data[i].year, label: res.data[i].year})
                    }
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.userQuery.pageNum = 1;
                this.userQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.userQuery.pageNum = val;
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
            //点击搜索按钮
            handleSearchList() {
                this.userQuery.pageNum = 1;
                this.getList();
            },
            //点击重置按钮
            handleResetSearch() {
                this.userQuery.userId = '';
                this.userQuery.name = '';
                this.userQuery.year = '';
                this.userQuery.organizationName = '';
                this.userQuery.clubFlag = '';
                this.getList();
            },
            setAdmin(userId){
                const user= {
                    userId: userId,
                    clubFlag: 2
                }
                this.updateUser(user);
            },
            setCommon(userId){
                const user= {
                    userId: userId,
                    clubFlag: 1
                }
                this.updateUser(user);
            },
            updateUser(user){
                updateUserInfo(user).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            }
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>