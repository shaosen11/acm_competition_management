<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="18">
                <h3>公告</h3>
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in this.noticeList" :key="item">
                        <div @click="toNoticeInfo(item.noticeId)">
                            <el-card>
                                <span class="title">
                                     <i class="iconfont el-icon-third-notification" style="margin-right: 5px"></i>{{ item.name }}
                                </span>
                                <p class="content markdown-body" v-dompurify-html="item.content"></p>
                                <div class="data">
                                    <i class="iconfont el-icon-third-time-circle" style="margin-right: 5px"></i>
                                    {{ item.time }}
                                </div>
                            </el-card>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="6">
                <el-card>
                    热门博客(24小时更新一次)
                    <div v-for="(blogHot,index) in this.blogHotList" :key="blogHot" class="text item">
                        <el-row style="margin: 15px auto;">
                            <el-col :span="2">
                                <span>{{ index+1 }}</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="name" @click="toBlog(blogHot.blogId)">{{ blogHot.name }}</div>
                                <el-col :span="16">
                                    <div class="userName" @click="toUserInfo(blogHot.userId)">{{ blogHot.userName }}
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <i class="iconfont el-icon-third-fire"></i>
                                    {{ blogHot.score}}
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
    import {listNotice} from '@/network/api/notice';
    import {listBlogHot} from '@/network/api/blog'

    export default {
        name: "Notice",
        data() {
            return {
                //队伍查询条件
                noticeQuery: {
                    showFlag: 1,
                },
                noticeList: [],
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
                this.getNoticeList();
                this.getBlogHotList()
                loading.close()
            },
            getNoticeList() {
                listNotice(this.noticeQuery.showFlag).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.noticeList = res.data
                })
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

</style>