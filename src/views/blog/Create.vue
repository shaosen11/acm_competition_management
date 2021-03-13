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
                <el-button @click="save" :loading="saveButtonLoading">保存</el-button>
                <el-button type="primary" @click="release" :loading="releaseButtonLoading">发布</el-button>
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
    import {releaseBlog, getContentByBlogId, saveBlog} from '@/network/api/blog'

    export default {
        name: "Create",
        data() {
            return {
                blog: {
                    userId: '',
                    blogId: '',
                    name: "",
                    markdown: "",
                    content: "",
                },
                saveButtonLoading: false,
                releaseButtonLoading: false,
                oldBlog: {}
            };
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.tipNotify()
                this.getContentByBlogId(this.$route.query.blogId)
            },
            tipNotify() {
                const h = this.$createElement;
                this.$notify.info({
                    title: '操作提示',
                    message: h('i', {style: 'color: teal'}, '当点击保存之后，等待系统重新跳转至本页面，请勿重新点击'),
                    offset: 50,
                    duration: 5000
                });
                this.$notify.info({
                    title: '操作提示',
                    message: h('i', {style: 'color: teal'}, '保存是保存为草稿，还不可见，发布经过审核才可见，发布之后点击保存会自动发布'),
                    offset: 150,
                    duration: 5000
                });
            },
            initCheck(userId) {
                if (this.$store.state.user.userId != userId) {
                    this.$message.error("请用发布账号登录");
                    this.$router.push('/home')
                }
            },
            getContentByBlogId(blogId) {
                if (blogId != null) {
                    getContentByBlogId(blogId).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.blog = res.data
                        this.initCheck(this.blog.userId)
                    })
                }
            },
            change(value, render) {
                this.blog.content = render;
            },
            save() {
                this.saveButtonLoading = true
                let blog = JSON.stringify(this.blog);
                let oldBlog = JSON.stringify(this.oldBlog)
                if (blog == oldBlog) {
                    this.saveButtonLoading = false
                    return;
                }
                this.blog.userId = this.$store.state.user.userId
                saveBlog(this.blog).then(res => {
                    if (res.code != 200) {
                        this.saveButtonLoading = false
                        return this.$message.error(res.message);
                    }
                    this.blog = res.data;
                    this.$message.success("保存成功");
                    //拷贝对象
                    this.oldBlog = JSON.parse(JSON.stringify(res.data))
                    if (this.blog.blogId != null) {
                        if (this.$route.query.blogId == null) {
                            this.saveButtonLoading = false
                            this.toCreate(this.blog.blogId)
                        }
                    }
                })
                this.saveButtonLoading = false
            },
            toCreate(blogId) {
                this.$router.push({
                    name: 'blogCreate',
                    query: {blogId}
                })
            },
            release() {
                this.releaseButtonLoading = true
                this.blog.userId = this.$store.state.user.userId,
                releaseBlog(this.blog).then(res => {
                    if (res.code != 200) {
                        this.releaseButtonLoading = false
                        return this.$message.error(res.message);
                    }
                    this.releaseButtonLoading = false
                    this.$router.push('/blogList')
                })
                this.releaseButtonLoading = false
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
                    url: "http://47.115.59.65:7777/minio/upload",
                    method: "post",
                    data: formdata,
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    this.$refs.md.$img2Url(pos, res.data.data.url);
                });
            },

        }
    }
</script>

<style scoped>
</style>