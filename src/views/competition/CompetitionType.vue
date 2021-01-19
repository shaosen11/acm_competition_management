<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item>比赛题型</el-breadcrumb-item>
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
import {listCompetitionType} from '@/network/api/competition'

export default {
    name: "CompetitionType",
    data() {
        return {
            list: [],
            isLoading: false
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.isLoading = true
            this.listCompetitionType()
            this.isLoading = false
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
</style>