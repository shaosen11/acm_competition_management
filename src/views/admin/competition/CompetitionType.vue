<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>比赛类型列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateCompetitionType">
                    <i class="el-icon-plus"></i>创建比赛类型
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
                        label="比赛类型"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述"
                        width="300"
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
                        :current-page="competitionTypeQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="competitionTypeQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {listCompetitionTypePage, updateCompetitionType} from '@/network/api/competition';

    export default {
        name: "Type",
        data() {
            return {
                //队伍查询条件
                competitionTypeQuery: {
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
                listCompetitionTypePage(this.competitionTypeQuery).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.competitionTypeQuery.pageNum = res.data.pageNum;
                    this.competitionTypeQuery.pageSize = res.data.pageSize;
                    if (this.total > this.competitionTypeQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.competitionTypeQuery.pageNum = 1;
                this.competitionTypeQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.competitionTypeQuery.pageNum = val;
                this.getList();
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const competitionType = {
                    id: row.id,
                    showFlag: row.showFlag
                }
                updateCompetitionType(competitionType).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //创建比赛类型
            toCreateCompetitionType(){
                this.$router.push("/admin/createCompetitionType")
            }
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>