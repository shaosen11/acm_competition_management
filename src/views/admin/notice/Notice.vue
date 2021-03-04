<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>公告列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateNotice">
                    创建公告
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
                                @click="toNoticeInfo(scope.row.noticeId)"
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
                                @click="toUpdateNotice(scope.row.noticeId)"
                                type="primary"
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
                        :current-page="noticeQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="noticeQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {listNoticeTypePage, updateNotice} from '@/network/api/notice';

    export default {
        name: "Notice",
        data() {
            return {
                //队伍查询条件
                noticeQuery: {
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
                listNoticeTypePage(this.noticeQuery).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.noticeQuery.pageNum = res.data.pageNum;
                    this.noticeQuery.pageSize = res.data.pageSize;
                    if (this.total > this.noticeQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.noticeQuery.pageNum = 1;
                this.noticeQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.noticeQuery.pageNum = val;
                this.getList();
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const notice = {
                    noticeId: row.noticeId,
                    showFlag: row.showFlag
                }
                updateNotice(notice).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //创建公告
            toCreateNotice() {
                this.$router.push("/admin/createNotice")
            },
            //创建公告
            toUpdateNotice(noticeId) {
                this.$router.push({
                    path: '/admin/createNotice',
                    query: {noticeId}
                })
            },
            //公告详情
            toNoticeInfo(noticeId) {
                this.$router.push({
                    path: '/notice',
                    query: {noticeId}
                })
            },
        }
    }
</script>

<style scoped>
    .pagination-container {
        margin: 15px auto;
    }
</style>