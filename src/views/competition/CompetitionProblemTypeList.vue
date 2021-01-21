<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/competitionProblemType'}">比赛类型</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>{{this.$route.query.name}}</h2>
        <el-divider></el-divider>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6" v-for="item in this.list" :key="item">
                <el-card shadow="hover">
                    <el-tooltip :content="item.name" placement="top">
                        <h3>{{ item.name|ellipsisName }}</h3>
                    </el-tooltip>
                    {{ item.description|ellipsis }}
                    <p>
                        <i class="iconfont el-icon-third-fire"></i>
                        {{ item.degree}}
                    </p>
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
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 10) {
                    return value.slice(0, 10) + '...'
                }
                return value
            },
            ellipsisName(value) {
                if (!value) return ''
                if (value.length > 8) {
                    return value.slice(0, 8) + '...'
                }
                return value
            }
        }
    }
</script>

<style scoped>
    .el-col {
        margin-bottom: 20px;
    }
</style>