<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item>比赛题型</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" style="margin: 50px 0px">
            <el-col :span="8" v-for="item in this.list" :key="item">
                <el-card shadow="hover" style="height: 170px;">
                    <div @click="toCompetitionProblemTypeList(item.name)">
                        <h2 class="name">{{ item.name }}</h2>
                        <span class="description">{{ item.description }}</span>
                        <div class="degree" :class="{ cardOne: item.degree >= 50,
                             cardTwo: item.degree >= 150,
                             cardThree: item.degree >= 300,
                             cardFour: item.degree >= 500,
                             cardFive: item.degree >= 1000}">
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
import {listCompetitionProblemType} from '@/network/api/competition'

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
            });
            this.listParentCompetitionProblemType()
            loading.close();
            this.$message.info("点击题型可进入子题型");
        },
        listParentCompetitionProblemType() {
            const competitionProblemType = {
                parentId: 0,
                showFlag: 1
            }
            listCompetitionProblemType(competitionProblemType).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                this.list = res.data
            })
        },
        toCompetitionProblemTypeList(name) {
            this.$router.push({name: 'competitionProblemTypeList', query: {name}})
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

.degree {
    float: right;
    margin-top: 10px
}

.cardOne {
    background: linear-gradient(to top, #eab026, #e3852b);
    -webkit-background-clip: text;
    color: transparent;
}

.cardTwo {
    background: linear-gradient(to top, #eab026, #e3852b, #d85d2a);
    -webkit-background-clip: text;
    color: transparent;
}

.cardThree {
    background: linear-gradient(to top, #eab026, #e3852b, #d85d2a, #ce2626);
    -webkit-background-clip: text;
    color: transparent;
}

.cardFour {
    background: linear-gradient(to top, #eab026, #e3852b, #d85d2a, #ce2626, #fa2c7b);
    -webkit-background-clip: text;
    color: transparent;
}

.cardFive {
    background: linear-gradient(to top, #eab026, #e3852b, #d85d2a, #ce2626, #fa2c7b, #c90444);
    -webkit-background-clip: text;
    color: transparent;
}
</style>