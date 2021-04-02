<template>
    <div>
        <el-card class="box-card">
            <el-tabs v-model="activeTab" @tab-click="handleClick">
                <el-tab-pane label="关注我的" name="follow"/>
                <el-tab-pane label="我关注的" name="user"/>
            </el-tabs>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="userId"
                    label="账号"
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
                    prop="gmtCreate"
                    label="关注时间"
                    width="200"
                    align="center">
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
import {listFollowUserPage, listUserPage} from "@/network/api/user";

export default {
    name: "UserFollow",
    data() {
        return {
            userQuery: {
                userId: this.$store.state.user.userId,
                pageNum: 1,
                pageSize: 10,
            },
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            activeTab: 'follow'
        }
    },
    created() {
        this.init()
    },
    methods: {
        //初始化方法
        init() {
            this.getList()
        },
        getList() {
            if (this.activeTab == 'follow') {
                this.listFollowUserPage();
            }
            if (this.activeTab == 'user') {
                this.listUserPage();
            }
        },
        //切换tab
        handleClick(tab) {
            if (tab.name == 'follow') {
                this.listFollowUserPage();
            }
            if (tab.name == 'user') {
                this.listUserPage();
            }
        },
        listUserPage() {
            this.listLoading = true;
            listUserPage(this.userQuery).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                this.handleResult(res)
            })
        },
        //获取表单信息
        listFollowUserPage() {
            this.listLoading = true;
            listFollowUserPage(this.userQuery).then(res => {
                this.listLoading = false;
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                this.handleResult(res)
            })
        },
        handleResult(res) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.userQuery.pageNum = res.data.pageNum;
            this.userQuery.pageSize = res.data.pageSize;
            if (this.total > this.pageSize) {
                this.isHide = false;
            } else {
                this.isHide = true;
            }
            this.listLoading = false;
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