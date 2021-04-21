<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>定时任务列表</span>
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
                    label="名称"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="持续时间"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="finishFlag"
                    label="执行结果"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="gmtCreate"
                    label="执行时间"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="comment"
                    label="备注"
                    width="200"
                    align="center">
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="query.pageNum"
                    :page-sizes="[5,10,15]"
                    :page-size="query.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import {listTaskByPage} from '@/network/api/task';

export default {
    name: "Task",
    data() {
        return {
            //队伍查询条件
            query: {
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
            listTaskByPage(this.query).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.totalPage = res.data.totalPage;
                this.query.pageNum = res.data.pageNum;
                this.query.pageSize = res.data.pageSize;
                if (this.total > this.query.pageSize) {
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.query.pageNum = 1;
            this.query.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.query.pageNum = val;
            this.getList();
        },
    }
}
</script>

<style scoped>
.pagination-container {
    margin: 15px auto;
}
</style>