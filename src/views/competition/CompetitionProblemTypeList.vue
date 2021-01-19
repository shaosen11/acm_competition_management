<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/competitionProblemType'}">比赛类型</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" style="margin: 50px 0px">
            <el-col :span="8" v-for="item in this.list" :key="item">
                <el-card shadow="hover">
                    <h2>{{ item.name }}</h2>
                    {{ item.description }}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {listChildrenCompetitionProblemType} from '@/network/api/competition'

    export default {
        data() {
            return {
                list: [],
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在加载',
                    spinner: 'el-icon-loading',
                });
                this.listChildrenCompetitionProblemType(this.$route.query.name)
                loading.close();
            },
            listChildrenCompetitionProblemType(name) {
                listChildrenCompetitionProblemType(name).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.list = res.data
                })
            }
        }
    }
</script>

<style scoped>
    .el-col {
        margin-bottom: 20px;
    }
</style>