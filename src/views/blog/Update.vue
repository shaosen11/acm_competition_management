<template>
    <div class="app-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
            <el-breadcrumb-item>创建博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px">
            <el-col :span="16">
                <el-input v-model="this.blog.name" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="submit">发布</el-button>
            </el-col>
        </el-row>
        <mavon-editor
            v-model="this.blog.content"
            ref="md"
            @imgAdd="$imgAdd"
            @change="change"
            style="min-height: 600px; margin-top: 10px"/>
    </div>
</template>

<script>
import {getBlogByBlogId} from '@/network/api/blog'
import {updateBlog} from '@/network/api/blog'

export default {
    name: "Update",
    data() {
        return {
            blog: {},
        };
    },
    created() {
        this.getBlogByBlogId(this.$route.query.blogId)
    },
    methods: {
        //获取博客信息
        getBlogByBlogId(blogId) {
            getBlogByBlogId(blogId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.blog = res.data
            })
        },
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            //将下面上传接口替换为你自己的服务器接口
            axios({
                url: "/common/upload",
                method: "post",
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(url => {
                this.$refs.md.$img2Url(pos, url);
            });
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.blog.content = render;
        },
        submit() {
            updateBlog(this.blog).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.$router.push('/blogList')
            })
        }
    }
}
</script>

<style scoped>
</style>