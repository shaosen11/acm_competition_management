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
            <el-table
                    v-loading="listLoading"
                    element-loading-text="努力加载中..."
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
                                size="mini"
                                @click="toTeamInfo(scope.row.name)">查看
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

    const defaultTeamQuery = {
        name: null,
        pageNum: 1,
        pageSize: 10,
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
    };

    export default {
        name: "List",
        created() {
            this.init();
        },
        data() {
            return {
                //队伍查询条件
                teamQuery: {
                    name: null,
                    pageNum: 1,
                    pageSize: 10,
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
                listLoading: true,
                //是否分页隐藏
                isHide: true
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
                    if (res.code != 200) {
                        this.$message.success(res.message);
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
                this.$router.push({name: 'team', query: {teamName: teamName}})
            },
            //点击搜索按钮
            handleSearchList() {
                this.teamQuery.pageNum = 1;
                this.getList();
            },
            //点击重置按钮
            handleResetSearch() {
                this.teamQuery = Object.assign({}, defaultTeamQuery);
            },
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 30px auto;
    }
</style>