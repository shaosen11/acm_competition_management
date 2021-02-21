<template>
    <div class="big-app-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客</el-breadcrumb-item>
            <el-breadcrumb-item>创建博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px">
            <el-col :span="16">
                <el-input v-model="blog.name" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="info" @click="save">保存草稿</el-button>
                <el-button type="primary" @click="release">发布</el-button>
            </el-col>
        </el-row>
        <mavon-editor
            v-model="blog.markdown"
            ref="md"
            @imgAdd="$imgAdd"
            @change="change"
            style="min-height: 600px; margin-top: 10px"/>
    </div>
</template>

<script>
    import {releaseBlog, saveBlog} from '@/network/api/blog'

    export default {
        name: "Create",
        data() {
            return {
                blog: {
                    name: "",
                    markdown: "",
                    content: "",
                }
            };
        },
        methods: {
            change(value, render) {
                // render 为 markdown 解析后的结果
                this.blog.content = render;
            },
            save(){
                const blog = {
                    userId: this.$store.state.user.userId,
                    name: this.blog.name,
                    content: this.blog.content,
                    markdown: this.blog.markdown,
                }
                saveBlog(blog).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.toUpdateBlog(res.data.blogId)
                })
            },
            toUpdateBlog(blogId) {
                this.$router.push({
                    name: 'blogUpdate',
                    query: {blogId}
                })
            },
            release() {
                this.blog.userId = this.$store.state.user.userId,
                releaseBlog(this.blog).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    this.toBlog(this.blog.blogId)
                })
            },
            toBlog(blogId) {
                this.$router.push({
                    name: 'blogInfo',
                    query: {blogId}
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
        }
    }
</script>

<style scoped>
</style>