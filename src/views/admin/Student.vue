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
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <b>学生列表</b>
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
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)" :underline="false">
                            <span>{{scope.row.userName }}</span>
                        </el-link>
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
                    prop="teamName"
                    label="队伍名称"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toTeamInfo(scope.row.teamName)" :underline="false">
                            <span>{{scope.row.teamName }}</span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    width="100"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            el-button
                            type="text"
                            v-if="scope.row.gender==1">
                            <i class="iconfont el-icon-third-man"></i>
                        </el-button>
                        <el-button
                            el-button
                            type="text"
                            v-if="scope.row.gender==0">
                            <i class="iconfont el-icon-third-woman"></i>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <p>是否可用：
                            <el-switch
                                @change="handleEnableStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.enableFlag">
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
import {ListUser, updateUserInfoById} from "@/network/api/user";
import {getOrganizationYearList} from '@/network/api/organization';

export default {
    name: "Student",
    created() {
        this.init();
    },
    data() {
        return {
            userQuery: {
                userId: null,
                name: null,
                year: '',
                organizationName: '',
                identityFlag: 2,
                pageNum: 1,
                pageSize: 5,
                options: []
            },
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
    methods: {
        //初始化方法
        init() {
            this.getList();
            this.getYearList()
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            ListUser(this.userQuery).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                console.log(res)
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
            this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
        },
        //跳转用户信息
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        },
        //跳转班级信息
        toOrganizationInfo(organization) {
            this.$router.push({
                name: 'organizationInfo',
                query: {
                    year: organization.year,
                    name: organization.organizationName
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
        },
        handleEnableStatusChange(row) {
            const user ={
                userId: row.userId,
                enableFlag: row.enableFlag,
            }
            updateUserInfoById(user).then(res => {
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
        margin: 15px auto;
    }
</style>