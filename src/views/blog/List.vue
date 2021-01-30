<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
            <el-breadcrumb-item>我的博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6">
                <div>
                    <UserInfo :user-id="this.userId" :user="this.user" :user-ext="this.userExt"></UserInfo>
                </div>
                <el-card style="margin-top: 10px">
                    热门博客
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <h2>博客列表</h2>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <h3 @click="toBlog(item.blogId)">{{ item.name }}</h3>
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
                                <el-dropdown-item @click.native="toBlog(item.blogId)">预览</el-dropdown-item>
                                <el-dropdown-item @click.native="toUpdateBlog(item.blogId)">编辑</el-dropdown-item>
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
import {listBlogPage} from '@/network/api/blog'
import {getUserInfo, getUserExtByUserId} from "@/network/api/user";
import UserInfo from "@/views/blog/components/UserStatisticsInfo";

export default {
    name: "List",
    components: {
        UserInfo
    },
    data() {
        return{
            //队伍查询条件
            blogQuery: {
                userId: this.$store.state.user.userId,
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
            userId: '',
            user: {},
            userExt: {}
        }
    },
    created() {
        this.init();
    },
    methods: {
        //初始化方法
        init() {
            this.getList();
            this.getUserInfo(this.$store.state.user.userId);
            this.getUserExtByUserId(this.$store.state.user.userId);
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            listBlogPage(this.blogQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.blogQuery.pageNum = res.data.pageNum;
                this.blogQuery.pageSize = res.data.pageSize;
                if (this.total > this.blogQuery.pageSize) {
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
        //获取用户信息
        getUserInfo(userId) {
            getUserInfo(userId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.user = res.data
            })
        },
        //获取用户扩展信息
        getUserExtByUserId(userId) {
            getUserExtByUserId(userId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.userExt = res.data
            })
        },
        toBlog(blogId){
            this.$router.push({
                name: 'blogInfo',
                query: {blogId}
            })
        },
        toUpdateBlog(blogId){
            this.$router.push({
                name: 'blogUpdate',
                query: {blogId}
            })
        },
    }
}
</script>

<style scoped>

</style>