<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/competitionProblemType'}">比赛题型</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$route.query.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>{{this.$route.query.name}}</h1>
        <el-divider></el-divider>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6" v-for="item in this.list" :key="item">
                <el-card shadow="hover" style="height: 160px;">
                    <div @click="toCompetitionProblemTypeSearch(item.name)">
                        <h3 class="name">{{ item.name }}</h3>
                        <span class="description">{{ item.description }}</span>
                        <div class="degree">
                            <i class="iconfont el-icon-third-fire"></i>
                            {{ item.degree }}
                        </div>
                    </div>
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
            },
            toCompetitionProblemTypeSearch(problemTypeName){
                this.$router.push({
                    name: 'competitionProblemTypeSearch',
                    query: {problemTypeName}
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
        }
    }
</script>

<style scoped>
    .el-col {
        margin-bottom: 20px;
    }

    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .degree {
        float: right;
        margin-top: 10px
    }
</style>