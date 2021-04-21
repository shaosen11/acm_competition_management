<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="18">
                <el-card>
                    <div slot="header" class="clearfix">
                        <b>公告列表</b>
                    </div>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                    <span class="title" @click="toNoticeInfo(item.noticeId)">
                         <i class="iconfont el-icon-third-notification" style="margin-right: 5px"></i>{{ item.name }}
                    </span>
                        <div class="data">
                            <i class="iconfont el-icon-third-time-circle" style="margin-right: 5px"></i>
                            <span>编辑于 </span>
                            {{ item.time }}
                            <el-divider direction="vertical"></el-divider>
                            <span>by </span>
                            {{ item.userId }}
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
            </el-col>
            <el-col :span="6">
                <el-card>
                    <b>热门博客</b>
                    <div v-for="(blogHot,index) in this.blogHotList" :key="blogHot" class="text item">
                        <el-row style="margin: 15px auto;">
                            <el-col :span="2">
                                <span>{{ index + 1 }}</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="name" @click="toBlog(blogHot.blogId)">{{ blogHot.name }}</div>
                                <el-col :span="16">
                                    <div class="userName" @click="toUserInfo(blogHot.userId)">{{ blogHot.userName }}
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <i class="iconfont el-icon-third-fire"></i>
                                    {{ blogHot.score }}
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import {listNoticePage} from '@/network/api/notice';
import {listBlogHot} from '@/network/api/blog'

export default {
    name: "Notice",
    data() {
        return {
            //队伍查询条件
            noticeQuery: {
                pageNum: 1,
                pageSize: 10,
            },
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            blogHotList: []
        }

    },
    created() {
        this.init();
    },
    methods: {
        //初始化方法
        init() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载',
            });
            this.getList();
            this.getBlogHotList()
            loading.close()
        },
        //获取比赛类型信息
        getList() {
            this.listLoading = true;
            this.noticeQuery.showFlag = 1;
            listNoticePage(this.noticeQuery).then(res => {
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
        //公告详情
        toNoticeInfo(noticeId) {
            this.$router.push({
                path: '/notice',
                query: {noticeId}
            })
        },
        getBlogHotList() {
            listBlogHot().then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.blogHotList = res.data
            })
        },
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId}})
        },
        toBlog(blogId) {
            this.$router.push({
                name: 'blogInfo',
                query: {blogId}
            })
        },
    }
}
</script>

<style scoped>
.userName {
    font-size: 16px;
}

.userName:hover {
    color: #409eff;
}

.name {
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.name:hover {
    color: #409EFF;
}

.data {
    margin-top: 10px;
    color: #909399;
}

.title {
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

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>