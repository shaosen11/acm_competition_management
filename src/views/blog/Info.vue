<template>
    <div>
        <div class="blog-container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <UserInfo :user-id="this.userId" :user="this.user" :user-ext="this.userExt"></UserInfo>
                    <el-card style="margin-top: 10px">
                        热门博客
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <h2>{{this.blog.name}}</h2>
                        <div style="margin: 15px 0px">
                            <h3>{{this.blog.userName}}</h3>
                        </div>
                        <span>{{ this.blog.time }}</span>
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
                        <div class="blog-content" v-html="this.blog.content"/>
                    </el-card>
                </el-col>
                <el-col :offset="6" :span="18" style="margin-top: 15px">
                    <el-card class="box-card">
                        <el-row :gutter="20">
                            <el-col :span="2" style="text-align:center;">
                                <el-avatar :size="40"
                                           :src="this.user.icon"/>
                            </el-col>
                            <el-col :span="22" >
                                <el-input
                                          v-model="input"
                                          type="textarea"
                                          :rows="3"
                                          @focus="focusComment"
                                          placeholder="写下你的评论">
                                </el-input>
                            </el-col>
                        </el-row>
                        <div class="btn-control" v-if="this.showItemId">
                            <span class="cancel" @click="cancel">取消</span>
                            <el-button class="btn" type="primary" round @click="commitComment">确定</el-button>
                        </div>
                        <el-divider></el-divider>
                        <h3>全部评论</h3>
                        <comment :comments="commentData"></comment>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="blog-footer">
            <div style="width: 80%; margin: 0px auto">
                <el-row :gutter="20" style="margin: 10px auto">
                    <el-col :offset="6" :span="18">
                        <el-input
                            v-model="input"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-edit"
                            style="width: 300px;"/>
                        <el-link :underline="false" style="margin-left: 15px">
                            <i class="iconfont el-icon-third-like" style="font-size: 20px"/>
                            {{ this.blog.clickCounter }}
                        </el-link>
                        <el-link :underline="false" style="margin-left: 15px">
                            <i class="iconfont el-icon-third-heart" style="font-size: 20px"/>
                            {{ this.blog.storeCounter }}
                        </el-link>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

</template>

<script>
import {getBlogByBlogId} from '@/network/api/blog'
import {getUserInfo, getUserExtByUserId} from "@/network/api/user";
import UserInfo from "@/views/blog/components/UserInfo";
import Comment from "@/views/blog/components/Comment";
import * as CommentData from '@/data/mockdata'

export default {
    name: "Info",
    components: {
        UserInfo,
        Comment
    },
    data(){
        return{
            userId: '',
            blog: {},
            user: {},
            userExt: {},
            input: '',
            commentData: [],
            showItemId: false
        }
    },
    created() {
        this.getBlogByBlogId(this.$route.query.blogId)
        this.commentData = CommentData.comment.data;
    },
    methods: {
        //获取博客信息
        getBlogByBlogId(blogId) {
            getBlogByBlogId(blogId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.blog = res.data
                this.userId = res.data.userId;
                this.getUserInfo(res.data.userId);
                this.getUserExtByUserId(res.data.userId);
            })
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

        focusComment() {
            this.showItemId = true
        },

        /**
         * 点击取消按钮
         */
        cancel() {
            this.showItemId = false
        },

        /**
         * 提交评论
         */
        commitComment() {
            console.log(this.inputComment);
        },
    }
}
</script>

<style scoped lang="scss">
.blog-content >>> img{
    width:100%;
}

.blog-container{
    width: 80%;
    margin: 0px auto;
    margin-bottom: 80px;
}

.blog-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #fff;
    box-shadow:0px 0px 1px #909399;
}
.btn-control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    .cancel {
        font-size: 16px;
        color: #606266;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
            color: #333;
        }
    }
    .confirm {
        font-size: 16px;
    }
}
</style>