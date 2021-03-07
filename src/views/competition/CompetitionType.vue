<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item>比赛类型</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" style="margin: 50px 0px">
            <el-col :span="8" v-for="item in this.list" :key="item">
                <el-card shadow="hover">
                    <h2 class="name">
                        {{ item.name }}
                    </h2>
                    <span class="description">{{ item.description }}</span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {listCompetitionType} from '@/network/api/competition'

export default {
    name: "CompetitionType",
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
            });
            this.listCompetitionType()
            loading.close();
        },
        listCompetitionType() {
            const competitionType = {
                showFlag: 1
            };
            listCompetitionType(competitionType).then(res => {
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
</style>