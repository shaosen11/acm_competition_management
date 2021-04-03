<template>
    <div class="mini-app-container">
        <el-card class="table-container">
            <h2>{{this.notice.name}}</h2>
            <div class="data">
                <i class="iconfont el-icon-third-time-circle" style="margin-right: 5px"></i>
                <span>编辑于 </span>
                {{ this.notice.time }}
                <el-divider direction="vertical"></el-divider>
                <span>by </span>
                {{ this.notice.userId }}
            </div>
            <el-divider></el-divider>
            <div class="blog-content markdown-body" v-dompurify-html="this.notice.content"></div>
        </el-card>
    </div>
</template>

<script>
    import {getByNoticeId} from '@/network/api/notice'

    export default {
        name: "Notice",
        data() {
            return {
                notice: {}
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getByNoticeId(this.$route.query.noticeId)
            },
            getByNoticeId(noticeId) {
                getByNoticeId(noticeId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.notice = res.data
                })
            }
        }
    }
</script>

<style scoped>
    .data {
        margin-top: 10px;
        color: #909399;
    }
</style>