<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>OJ系统列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateOnlineJudge">
                    添加OJ系统
                </el-button>
            </div>
            <el-table
                    v-loading="listLoading"
                    element-loading-text="努力加载中..."
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="OJ系统"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="OJ网址"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <p>显示：
                            <el-switch
                                    @change="handleShowFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.showFlag">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="详情"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                round>查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="onlineJudgeQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="onlineJudgeQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {listOnlineJudgeSystemPage, updateOnlineJudgeSystem} from '@/network/api/report';

    export default {
        name: "OnlineJudge",
        data() {
            return {
                //队伍查询条件
                onlineJudgeQuery: {
                    pageNum: 1,
                    pageSize: 5,
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
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getList();
            },
            //获取比赛类型信息
            getList() {
                this.listLoading = true;
                listOnlineJudgeSystemPage(this.onlineJudgeQuery).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.onlineJudgeQuery.pageNum = res.data.pageNum;
                    this.onlineJudgeQuery.pageSize = res.data.pageSize;
                    if (this.total > this.onlineJudgeQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.onlineJudgeQuery.pageNum = 1;
                this.onlineJudgeQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.onlineJudgeQuery.pageNum = val;
                this.getList();
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const onlineJudgeSystem = {
                    id: row.id,
                    showFlag: row.showFlag
                }
                updateOnlineJudgeSystem(onlineJudgeSystem).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //创建OJ系统
            toCreateOnlineJudge() {
                this.$router.push("/admin/createOnlineJudge")
            },
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>