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
                <el-form :inline="true" :model="userQuery" size="small" label-width="140px">
                    <el-form-item label="老师账号：">
                        <el-input style="width: 203px" v-model="userQuery.userId" placeholder="老师账号"></el-input>
                    </el-form-item>
                    <el-form-item label="老师名称：">
                        <el-input style="width: 203px" v-model="userQuery.name" placeholder="老师名称"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>老师列表</span>
            </div>
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
                </el-table-column>
                <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="loginTime"
                    label="最近登录时间"
                    width="200"
                    align="center">
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
import {ListUser, updateUserInfo} from "@/network/api/user";

export default {
    name: "Teacher",
    created() {
        this.init();
    },
    data() {
        return {
            //队伍查询条件
            userQuery: {
                userId: null,
                name: null,
                identityFlag: 1,
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
            ListUser(this.userQuery).then(res => {
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
        //处理是否显示
        handleEnableStatusChange(row) {
            const user = {
                userId: row.userId,
                enableFlag: row.enableFlag,
            }
            updateUserInfo(user).then(res => {
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