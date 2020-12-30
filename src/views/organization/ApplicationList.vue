<template>
    <div>
        <!--学生列表-->
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <el-page-header @back="toOrganizationInfo" content="申请列表">
                </el-page-header>
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
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="名称"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toUserInfo(scope.row.userId)">{{ scope.row.userName }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="teamName"
                    label="队伍名称"
                    width="250"
                    align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toTeamInfo(scope.row.teamName)">{{
                                scope.row.teamName
                            }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    width="220"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            el-button
                            type="text"
                            v-if="scope.row.gender==1">
                            <i class="el-icon-male"></i>
                        </el-button>
                        <el-button
                            el-button
                            type="text"
                            v-if="scope.row.gender==0">
                            <i class="el-icon-female"></i>
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
import {getOrganizationUserCooperationList} from '@/network/api/organization';

export default {
    name: "ApplicationList",
    data() {
        return {
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
            const OrganizationUserCooperationQueryParam = {
                year: this.$route.query.year,
                name: this.$route.query.name,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
            getOrganizationUserCooperationList(OrganizationUserCooperationQueryParam).then(res => {
                if (res.code !== 200) {
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
            this.$router.push({name: 'organizationInfo',
                query: {
                    year: this.$route.query.year,
                    name: this.$route.query.name,
                }
            })
        },
    }
}
</script>

<style scoped>

</style>