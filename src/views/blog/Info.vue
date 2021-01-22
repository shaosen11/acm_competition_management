<template>
    <div class="app-container">
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
                    <h2>{{this.blog.name}}</h2>
                    <div style="margin: 15px 0px">
                        <b>{{this.blog.userName}}</b>
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
        </el-row>
    </div>
</template>

<script>
import {getBlogByBlogId} from '@/network/api/report'
import {getUserInfo, getUserExtByUserId} from "@/network/api/user";
import UserInfo from "@/views/blog/components/UserInfo";
export default {
    name: "Info",
    components: {
        UserInfo
    },
    data(){
        return{
            userId: '',
            blog: {},
            user: {},
            userExt: {}
        }
    },
    created() {
        this.getBlogByBlogId(this.$route.query.blogId)
    },
    methods: {
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
    }
}
</script>

<style scoped>
.blog-content >>> img{
    width:100%;
}
</style>