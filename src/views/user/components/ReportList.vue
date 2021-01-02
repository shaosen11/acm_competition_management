<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>解题报告</span>
            <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    v-if="this.$store.state.user.userId==this.userId">添加
            </el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "ReportList",
        props: {
            userId: {
                type: String
            }
        },
        data() {
            return {}
        },
        created() {
            this.init()
        },
        methods: {
            init() {
            }
        },
    }
</script>

<style scoped>

</style>