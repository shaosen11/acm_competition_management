<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="searchBrandList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="teamQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="teamQuery.name" placeholder="队伍名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-card class="table-container">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="队伍名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="队长"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="motto"
                        label="座右铭"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="userCount"
                        label="当前人数">
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作">
                    <template slot-scope="scope">

                        <el-button
                                size="mini">查看
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary">加入
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

    </div>
</template>

<script>
    import {getTeamList} from '@/network/api/team';

    export default {
        name: "List",
        created() {
            this.init();
        },
        data() {
            return {
                teamQuery: {
                    name: null,
                    pageNum: 1,
                    pageSize: 10
                },
                tableData: [],
                total: null,
                listLoading: true,
                isHide: true

            }
        },
        methods: {
            init() {
                this.getList();
            },
            getList() {
                this.listLoading = true;
                getTeamList(this.teamQuery).then(res => {
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    console.log(res.data)
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.teamQuery.pageNum = res.data.pageNum;
                    this.teamQuery.pageSize = res.data.pageSize;
                    if (this.total > this.teamQuery.pageSize){
                        this.isHide = false;
                    }
                })
            },
            handleSizeChange(val) {
                this.teamQuery.pageNum = 1;
                this.teamQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.teamQuery.pageNum = val;
                this.getList();
            },
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 30px auto;
    }
</style>