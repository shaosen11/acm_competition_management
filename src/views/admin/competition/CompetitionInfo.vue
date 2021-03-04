<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toCompetitionList" content="报名数据分析">
                </el-page-header>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    团队报名数量：{{this.competition.teamNumber}}
                </el-col>
                <el-col :span="12">
                    个人报名数量：{{this.competition.userNumber}}
                </el-col>
                <div style="margin: 30px auto">
                    <el-col :span="12">
                        <h4>团队/个人报名情况</h4>
                        <ve-histogram :data="chartData"></ve-histogram>
                    </el-col>
                    <el-col :span="12">
                        <h4>年级总报名人数</h4>
                        <ve-pie :data="lineData"></ve-pie>
                    </el-col>
                </div>

            </el-row>

        </el-card>

    </div>
</template>

<script>
    import {listChartByCompetitionId, getCompetitionByCompetitionId} from '@/network/api/competition'

    export default {
        name: "CompetitionInfo",
        data() {
            return {
                competition: {},
                chartData: {
                    columns: ["年级", "个人报名人数", "团队报名人数"],
                    rows: []
                },
                lineData: {
                    columns: ["年级", "报名人数"],
                    rows: []
                }
            };
        },
        created() {
            this.init()
        },
        methods: {
            init(){
                this.listChartByCompetitionId(this.$route.query.competitionId)
                this.getCompetitionByCompetitionId(this.$route.query.competitionId)
            },
            listChartByCompetitionId(competitionId) {
                listChartByCompetitionId(competitionId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.chartData.rows.push({"年级": res.data[i].year, "个人报名人数": res.data[i].singleCount, "团队报名人数": res.data[i].teamCount})
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.lineData.rows.push({"年级": res.data[i].year, "报名人数": res.data[i].count})
                    }
                })
            },
            //获取比赛信息
            getCompetitionByCompetitionId(competitionId) {
                const competition = {
                    competitionId
                }
                getCompetitionByCompetitionId(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.competition = res.data
                })
            },
            //去比赛列表
            toCompetitionList() {
                this.$router.push("/admin/competitionList")
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>