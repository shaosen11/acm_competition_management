<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toNotice" content="编辑公告">
                </el-page-header>
            </div>
            <el-row :gutter="20" type="flex" justify="center">
                <el-col :span="12">
                    <el-input v-model="notice.name" placeholder="请输入标题"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="info" @click="update" v-if="this.updateFlag === true">保存</el-button>
                    <el-button type="primary" @click="create" v-else>
                        发布
                    </el-button>
                </el-col>
            </el-row>
            <mavon-editor
                    v-model="notice.contentMd"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @change="change"
                    style="min-height: 600px; margin-top: 10px"/>
        </el-card>
    </div>
</template>

<script>
    import {createNotice, updateNotice, getByNoticeId} from '@/network/api/notice';

    export default {
        name: "Create",
        data() {
            return {
                notice: {
                    noticeId: '',
                    name: '',
                    userId: this.$store.state.user.userId,
                    content: '',
                    contentMd: '',
                    showFlag: 0,
                },
                updateFlag: false,
                isLoading: false,
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getNoticeByNoticeId(this.$route.query.noticeId)
            },
            getNoticeByNoticeId(noticeId) {
                if (noticeId != null) {
                    getByNoticeId(noticeId).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.notice = res.data
                        this.updateFlag = true;
                    })
                }
            },
            change(value, render) {
                this.notice.content = render;
            },
            //创建公告
            create() {
                createNotice(this.notice).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.toNotice()
                })
            },
            //修改公告
            update() {
                updateNotice(this.notice).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.getNoticeByNoticeId(this.$route.query.noticeId)
                })
            },
            //公告列表
            toNotice() {
                this.$router.push("/admin/notice")
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
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(url => {
                    this.$refs.md.$img2Url(pos, url);
                });
            },
        }
    }
</script>

<style scoped>
</style>