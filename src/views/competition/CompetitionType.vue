<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item>比赛类型</el-breadcrumb-item>
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
            listCompetitionType().then(res => {
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

<style scoped="less">
.el-row {
    margin-bottom: 20px;

&
:last-child {
    margin-bottom: 0;
}

}
.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>