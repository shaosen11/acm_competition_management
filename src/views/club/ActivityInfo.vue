<template>
    <div class="app-container">
        <el-card class="table-container">
            <h2>
                <i class="iconfont el-icon-third-activity"></i>
                {{this.activity.name}}
            </h2>
            <p>
                <i class="iconfont el-icon-third-location"></i>
                {{ this.activity.position }}
            </p>
            <p>
                <i class="iconfont el-icon-third-time-circle"></i>
                {{ this.activity.startTime }} - {{ this.activity.endTime }}
            </p>
            <el-divider></el-divider>
            <div class="blog-content markdown-body" v-dompurify-html="this.activity.content"></div>
        </el-card>
    </div>
</template>

<script>
    import {getByActivityId} from '@/network/api/club'

    export default {
        name: "ActivityInfo",
        data() {
            return {
                activity: {}
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getByActivityId(this.$route.query.activityId)
            },
            getByActivityId(activityId) {
                getByActivityId(activityId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.activity = res.data
                    console.log(this.activity)
                })
            }
        }
    }
</script>

<style scoped>
</style>