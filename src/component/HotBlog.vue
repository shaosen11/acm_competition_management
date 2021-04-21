<template>
    <el-card>
        <b>热门博客</b>
        <div class="onePxDivider"></div>
        <div v-for="(blogHot,index) in this.blogHotList" :key="blogHot" class="text item">
            <el-row style="margin: 15px auto;">
                <el-col :span="2">
                    <span>{{ index+1 }}</span>
                </el-col>
                <el-col :span="20">
                    <div class="name" @click="toBlog(blogHot.blogId)">{{ blogHot.name }}</div>
                    <el-col :span="18">
                        <div class="userName" @click="toUserInfo(blogHot.userId)">{{ blogHot.userName }}</div>
                    </el-col>
                    <el-col :span="6">
                        <i class="iconfont el-icon-third-eye"/>
                        {{ blogHot.visitCounter}}
                    </el-col>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "HotBlog",
        props: {
            blogHotList: []
        },
        methods: {
            toBlog(blogId) {
                this.$router.push({
                    name: 'blogInfo',
                    query: {blogId}
                })
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId: userId}});
            }
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
</style>