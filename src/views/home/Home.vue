<template>
    <div class="app-container">
        <el-card>
            <div slot="header" class="clearfix">
                <span>公告列表</span>
            </div>
            <div v-for="item in this.tableData" :key="item" class="text item">
                <span class="title">
                    {{ item.name }}
                </span>
                <p class="content markdown-body" v-dompurify-html="item.content"></p>
                <div class="data">
                    {{ item.time }}
                </div>
                <div class="divider"></div>
            </div>
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
    import {listNoticeTypePage} from '@/network/api/notice';

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
                    console.log(res.data.list)
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
    .data {
        color: #909399;
    }

    .title{
        font-size: 20px;
    }

    .title:hover {
        color: #409eff;
    }

    .content {
        color: #909399;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>