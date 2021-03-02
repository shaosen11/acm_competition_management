<template>
    <div class="app-container">
        <el-card class="table-container">
            <h2>{{this.notice.name}}</h2>
            <span>
                <i class="iconfont el-icon-third-time-circle"></i>
                {{ this.notice.time }}
            </span>
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
</style>