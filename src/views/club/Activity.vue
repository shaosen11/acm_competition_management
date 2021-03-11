<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>活动列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateActivity">
                    创建活动
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
                        label="公告名称"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="发布者id"
                        width="150"
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
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="toActivityInfo(scope.row.activityId)"
                                round>查看详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="修改"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                @click="toUpdateActivity(scope.row.activityId)"
                                type="primary"
                                size="mini"
                                round>修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="activityQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="activityQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {listActivityByPage, updateActivity} from '@/network/api/club';

    export default {
        name: "Activity",
        data() {
            return {
                //队伍查询条件
                activityQuery: {
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
                listActivityByPage(this.activityQuery).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.activityQuery.pageNum = res.data.pageNum;
                    this.activityQuery.pageSize = res.data.pageSize;
                    if (this.total > this.activityQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.activityQuery.pageNum = 1;
                this.activityQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.activityQuery.pageNum = val;
                this.getList();
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const notice = {
                    activityId: row.activityId,
                    showFlag: row.showFlag
                }
                updateActivity(notice).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            toCreateActivity() {
                this.$router.push("/club/createActivity")
            },
            toUpdateActivity(activityId) {
                this.$router.push({
                    path: '/club/createActivity',
                    query: {activityId}
                })
            },
            toActivityInfo(activityId) {
                this.$router.push({
                    path: '/activityInfo',
                    query: {activityId}
                })
            },
        }
    }
</script>

<style scoped>

</style>