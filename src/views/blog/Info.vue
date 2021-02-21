<template>
    <div>
        <div class="blog-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <!--用户信息-->
                    <user-statistics-info :user-id="this.userId"
                                          :user-ext="this.userExt"></user-statistics-info>
                    <!--热门博客-->
                    <hot-blog :blogHotList="this.blogHotList" style="margin-top: 10px"/>
                </el-col>
                <!--博客内容-->
                <el-col :span="18">
                    <el-card>
                        <h2>{{ this.blog.name }}</h2>
                        <div style="margin: 15px 0px">
                            <h3><i class="iconfont el-icon-third-user"
                                   style="font-size: 20px; margin-right: 5px"></i>{{ this.blog.userName }}</h3>
                        </div>
                        <span>
                            <i class="iconfont el-icon-third-time-circle"></i>
                            {{ this.blog.time }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-eye"/>
                            {{ this.blog.visitCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-like"/>
                            {{ this.blog.clickCounter }}
                        </span>
                        <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-heart"/>
                            {{ this.blog.storeCounter }}
                        </span>
                        <el-divider></el-divider>
                        <div class="blog-content markdown-body" v-dompurify-html="this.blogContent"></div>
                    </el-card>
                </el-col>
                <!--评论内容-->
                <el-col :offset="6" :span="18" style="margin-top: 15px">
                    <el-card class="box-card">
                        <comment :comments="commentData"></comment>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--底部-->
        <div class="blog-footer">
            <div style="width: 80%; margin: 0px auto">
                <el-row :gutter="20" style="margin: 10px auto">
                    <el-col :offset="6" :span="18">
                        <el-input
                                v-model="input"
                                placeholder="请输入内容"
                                suffix-icon="el-icon-edit"
                                style="width: 300px;"/>
                        <el-link
                                :underline="false"
                                style="margin-left: 20px"
                                @click="click">
                            <div :class="{ 'click' : clickFlag }">
                                <i class="iconfont el-icon-third-like" style="font-size: 20px"/>
                                {{ this.blog.clickCounter }}
                            </div>
                        </el-link>
                        <el-link
                                :underline="false"
                                style="margin-left: 15px"
                                @click="beforeStore">
                            <div :class="{ 'store' : storeFlag }">
                                <i class="iconfont el-icon-third-heart" style="font-size: 20px"/>
                                {{ this.blog.storeCounter }}
                            </div>
                        </el-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <store :user-store-folder="this.userStoreFolder"
               :store-dialog-visible="this.storeDialogVisible"
               @storeDialogVisibleFalse="storeDialogVisibleFalse"
               @store="store"/>
    </div>
</template>

<script>
    import {
        getStatisticsByBlogId,
        click,
        getClickByBlogIdAndUserId,
        getContentByBlogId,
        insertBlogUserView,
        getHotBlogByUserId
    } from '@/network/api/blog'
    import {
        getUserStoreByBlogIdAndUserId,
        createUserStore,
        getUserStoreFolder,
        deleteUserStore
    } from '@/network/api/user'
    import {getUserExtByUserId} from "@/network/api/user";
    import UserStatisticsInfo from "@/views/blog/components/UserStatisticsInfo";
    import Comment from "@/views/blog/components/Comment";
    import Store from "@/views/blog/components/Store";
    import HotBlog from "@/component/HotBlog";
    import * as CommentData from '@/data/mockdata'

    export default {
        name: "Info",
        components: {
            UserStatisticsInfo,
            Comment,
            Store,
            HotBlog
        },
        data() {
            return {
                blog: {},
                blogContent: '',
                userExt: {},
                input: '',
                commentData: [],
                showItemId: false,
                clickFlag: false,
                storeFlag: false,
                userStore: '',
                userStoreParentId: '',
                userStoreFolder: [],
                storeDialogVisible: false,
                blogHotList: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getStatisticsByBlogId(this.$route.query.blogId)
            },
            //判断是否仅自己可见
            isPrivate() {
                if (this.blog.showFlag == 0) {
                    if (this.blog.userId != this.$store.state.user.userId) {
                        this.$message.error("请用发布账号登录");
                        return this.$router.push('/blog');
                    }
                }
                //是本人登录，进行初始化
                this.afterInit()
            },
            //判断是否管理员关闭
            isAdminPrivate() {
                if (this.blog.adminShowFlag == 0) {
                    this.$message.error("博客涉及违规内容，以限制浏览");
                    return this.$router.push('/blog')
                }
                this.isPrivate()
            },
            afterInit() {
                this.getUserExtByUserId(this.blog.userId);
                this.getContentByBlogId(this.blog.blogId);
                this.getClickByBlogIdAndUserId();
                this.getUserStoreByBlogIdAndUserId();
                this.insertBlogUserView();
                this.commentData = CommentData.comment.data;
                this.isDraft();
                this.isGarbage();
                this.getHotBlogByUserId(this.blog.userId);
            },
            isDraft() {
                if (this.blog.status == 1) {
                    if (this.blog.userId == this.$store.state.user.userId) {
                        this.$message.info("此博客还在草稿状态");
                    }
                }
            },
            isGarbage() {
                if (this.blog.garbageFlag == 1) {
                    this.$message.info("此博客已被博主移至回收站，随时可能删除");
                }
            },
            //获取博客数据
            getStatisticsByBlogId(blogId) {
                getStatisticsByBlogId(blogId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    if (res.data == null) {
                        return this.$message.info("博客已被博主删除");
                    }
                    this.blog = res.data;
                    //判断是否管理员限制浏览
                    this.isAdminPrivate()
                })
            },
            //获取博客内容
            getContentByBlogId(blogId) {
                getContentByBlogId(blogId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.blogContent = res.data.content
                })
            },
            //插入浏览记录
            insertBlogUserView() {
                if (this.$store.state.user.userId == "") {
                    return ;
                }
                const blogUserView = {
                    blogId: this.$route.query.blogId,
                    userId: this.$store.state.user.userId
                }
                insertBlogUserView(blogUserView).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
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
            //点赞
            click() {
                if (this.$store.state.user.userId == "") {
                    return this.$message.info("请先登录");
                }
                const blogUserClick = {
                    blogId: this.$route.query.blogId,
                    userId: this.$store.state.user.userId
                }
                click(blogUserClick).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    if (this.clickFlag == true) {
                        this.blog.clickCounter -= 1;
                        this.userExt.clickCounter -= 1;
                        this.clickFlag = false;
                    } else {
                        this.blog.clickCounter += 1;
                        this.userExt.clickCounter += 1;
                        this.clickFlag = true;
                    }
                    this.getClickByBlogIdAndUserId()
                })
            },
            //查询用户是否点赞
            getClickByBlogIdAndUserId() {
                const blogUserClick = {
                    blogId: this.$route.query.blogId,
                    userId: this.$store.state.user.userId
                }
                getClickByBlogIdAndUserId(blogUserClick).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.clickFlag = res.data
                })
            },
            //判断是否收藏过
            beforeStore() {
                if (this.$store.state.user.userId == "") {
                    return this.$message.info("请先登录");
                }
                if (this.storeFlag == true) {
                    const userStore = {
                        id: this.userStore.id,
                        blogId: this.userStore.blogId,
                        blogFlag: 1,
                        folderFlag: 1,
                    }
                    deleteUserStore(userStore).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.blog.storeCounter -= 1;
                        this.getUserStoreByBlogIdAndUserId();
                    })
                } else {
                    this.storeDialogVisibleTrue()
                }
            },
            //打开dialog
            storeDialogVisibleTrue() {
                this.storeDialogVisible = true;
                this.getUserStoreFolder();
            },
            storeDialogVisibleFalse() {
                this.storeDialogVisible = false;
            },
            //获取收藏夹
            getUserStoreFolder() {
                const userStore = {
                    userId: this.$store.state.user.userId,
                    folderFlag: 0,
                }
                getUserStoreFolder(userStore).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.userStoreFolder = res.data
                })
            },
            //收藏
            store(id) {
                const userStore = {
                    userId: this.$store.state.user.userId,
                    blogId: this.$route.query.blogId,
                    blogFlag: 1,
                    folderFlag: 1,
                    parentId: id,
                    showFlag: 1,
                }
                createUserStore(userStore).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    this.blog.storeCounter += 1;
                    this.userExt.storeCounter += 1;
                    this.getUserStoreByBlogIdAndUserId()
                    this.storeDialogVisibleFalse()
                })
            },
            //查询用户是否收藏
            getUserStoreByBlogIdAndUserId() {
                const userStore = {
                    blogId: this.$route.query.blogId,
                    userId: this.$store.state.user.userId
                }
                getUserStoreByBlogIdAndUserId(userStore).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                    }
                    if (res.data != null) {
                        this.userStore = res.data
                        this.storeFlag = true
                    } else {
                        this.storeFlag = false
                    }
                })
            },
            getHotBlogByUserId(userId) {
                getHotBlogByUserId(userId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.blogHotList = res.data
                })
            },
        },
    }
</script>

<style scoped>
    .blog-container {
        width: 85%;
        margin: 0px auto;
        margin-bottom: 80px;
    }

    .blog-footer {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background: #fff;
        box-shadow: 0px 0px 1px #909399;
    }

    .click {
        color: #409EFF;
    }

    .store {
        color: #F56C6C;
    }
</style>