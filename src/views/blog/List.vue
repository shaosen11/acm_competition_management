<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
            <el-breadcrumb-item>我的博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6">
                <el-card>
                    我的信息
                </el-card>
                <el-card style="margin-top: 10px">
                    热门博客
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <h2>博客列表</h2>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <h3>{{ item.name }}</h3>
                        {{ item.time }}
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-eye"/>
                            {{ item.visitCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-like"/>
                            {{ item.clickCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-heart"/>
                            {{ item.storeCounter }}
                        </span>
                        <el-dropdown trigger="click" style="float: right; margin-left: 15px">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>预览</el-dropdown-item>
                                <el-dropdown-item>编辑</el-dropdown-item>
                                <el-dropdown-item divided>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-divider></el-divider>
                    </div>
                    <div class="pagination-container" style="float: right; margin-bottom: 15px">
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="blogQuery.pageNum"
                            :page-sizes="[5,10,15]"
                            :page-size="blogQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            :hide-on-single-page="isHide">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {listBlogPage} from '@/network/api/report'

export default {
    name: "List",
    data() {
        return{
            //队伍查询条件
            blogQuery: {
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
        //获取表单信息
        getList() {
            this.listLoading = true;
            listBlogPage(this.blogQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                console.log(res.data)
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.blogQuery.pageNum = res.data.pageNum;
                this.blogQuery.pageSize = res.data.pageSize;
                if (this.total > this.blogQuery.pageSize) {
                    console.log("false")
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.blogQuery.pageNum = 1;
            this.blogQuery.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.blogQuery.pageNum = val;
            this.getList();
        },
    }
}
</script>

<style scoped>

</style>