<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="10" type="flex" justify="center" style="margin: 50px">
                <el-col :span="24">
                    <el-steps :active="1" finish-status="success" align-center>
                        <el-step title="正在报名"></el-step>
                        <el-step title="截止报名"></el-step>
                        <el-step title="进行比赛"></el-step>
                        <el-step title="比赛结束"></el-step>
                    </el-steps>
                </el-col>
            </el-row>


            <el-form ref="form"
                     :model="form"
                     label-width="120px"
                     v-loading="isLoading"
                     element-loading-text="努力加载中...">
                <el-form-item label="比赛名称">
                    <span>{{ form.name }}</span>
                </el-form-item>
                <el-form-item label="比赛地点">
                    <span>{{ form.position }}</span>
                </el-form-item>
                <el-form-item label="比赛时间">
                    <span>{{ form.startTime }} - {{ form.endTime }}</span>
                </el-form-item>
                <el-form-item label="报名截止时间">
                    <span>{{ form.registrationTime }}</span>
                </el-form-item>
            </el-form>

            <el-row :gutter="10" type="flex" justify="center">
                <el-col :span="24">
                    <div style="text-align: center">
                        <el-button
                            v-if="this.form.registrationFlag!=1"
                            type="primary"
                            @click="applyDialogVisible = true"
                            round>报名
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
            title="报名"
            :visible.sync="applyDialogVisible"
            width="50%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="比赛名称">
                    <span>{{ form.name }}</span>
                </el-form-item>
                <el-form-item label="比赛地点">
                    <span>{{ form.position }}</span>
                </el-form-item>
                <el-form-item label="比赛时间">
                    <span>{{ form.startTime }} - {{ form.endTime }}</span>
                </el-form-item>
                <el-form-item label="报名截止时间">
                    <span>{{ form.registrationTime }}</span>
                </el-form-item>
                <el-form-item label="报名方式">
                    <el-radio
                        v-if="this.$store.state.team.myTeamFlag"
                        v-model="radio"
                        label="1">团队
                    </el-radio>
                    <el-radio
                        v-if="this.$store.state.user.isLogin"
                        v-model="radio"
                        label="2">个人
                    </el-radio>
                </el-form-item>
                <el-form-item label="团队/个人">
                    <span v-if="this.radio==1">
                        {{ this.$store.state.team.teamName }}
                    </span>
                    <span v-if="this.radio==2">
                        {{ this.$store.state.user.name }}
                    </span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="applyDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="applyJoinCompetition">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import {getCompetitionByCompetitionId, applyJoinCompetition} from '@/network/api/competition'

export default {
    name: "Info",
    data() {
        return {
            // 是否正在加载
            isLoading: '',
            form: {
                id: '',
                competitionId: '',
                name: '',
                description: '',
                startTime: '',
                endTime: '',
                registrationTime: '',
                registrationFlag: '',
                position: '',
                teamFlag: '',
                personFlag: '',
                showFlag: '',
                userId: '',
                userName: '',
            },
            radio: '',
            applyDialogVisible: false
        }
    },
    created() {
        this.isLoading = true
        this.init()
        this.isLoading = false
    },
    methods: {
        init() {
            this.getCompetitionByCompetitionId(this.$route.query.competitionId)
        },
        getCompetitionByCompetitionId(competitionId) {
            const competition = {
                competitionId
            }
            getCompetitionByCompetitionId(competition).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.form = res.data
            })
        },
        //报名比赛
        applyJoinCompetition() {
            this.applyDialogVisible = false;
            let competitionUserRelation = {
                competitionId: this.$route.query.competitionId,
                teamFlag: 0,
                singleFlag: 0,
                userId: this.$store.state.user.userId
            }
            if (this.radio == 1) {
                competitionUserRelation.teamFlag = 1;
            }
            if (this.radio == 2) {
                competitionUserRelation.singleFlag = 1;
            }
            applyJoinCompetition(competitionUserRelation).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
            })
        }
    }
}
</script>

<style scoped>

</style>