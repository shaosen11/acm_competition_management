<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>比赛</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/competition' }">比赛列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.form.competitionName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="never" style="margin-top: 30px">
            <el-row :gutter="10" type="flex" justify="center" style="margin: 50px 0px">
                <el-col :span="24">
                    <el-steps :active="this.activeStep" finish-status="success" align-center>
                        <el-step title="正在报名"></el-step>
                        <el-step title="截止报名"></el-step>
                        <el-step title="进行比赛"></el-step>
                        <el-step title="比赛结束"></el-step>
                    </el-steps>
                </el-col>
            </el-row>

            <el-row :gutter="10" type="flex" justify="center" style="margin: 50px">
                <el-col :span="12">
                    <el-form ref="form"
                             :model="form"
                             size="mini"
                             label-width="120px"
                             v-loading="isLoading"
                             element-loading-text="努力加载中...">
                        <el-form-item label="比赛名称">
                            <el-input v-model="form.competitionName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛地点">
                            <el-input v-model="form.position" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛地点">
                            <el-date-picker
                                    :disabled="true"
                                    v-model="form.time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="报名截止时间">
                            <el-date-picker
                                    :disabled="true"
                                    v-model="form.registrationTime"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="比赛类型">
                            <el-input v-model="form.typeName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="报名方式">
                            <el-checkbox
                                    v-if="form.singleFlag == 1"
                                    v-model="form.singleFlag"
                                    :true-label=1
                                    :false-label=0
                                    disabled
                                    border>个人报名
                            </el-checkbox>
                            <el-checkbox
                                    v-if="form.teamFlag == 1"
                                    v-model="form.teamFlag"
                                    :true-label=1
                                    :false-label=0
                                    disabled
                                    border>团队报名
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <el-row :gutter="10" type="flex" justify="center">
                <el-col :span="24">
                    <div style="text-align: center">
                        <el-button
                                :disabled="this.applyButton"
                                type="primary"
                                @click="applyDialogVisible = true"
                                round>报名
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <el-row :gutter="10" type="flex" justify="center" style="margin: 50px 0px">
            <el-col :span="24">
                <div class="infinite-list-wrapper" style="overflow:auto; height: 500px">
                    <el-timeline
                            v-infinite-scroll="load"
                            infinite-scroll-disabled="disabled">
                        <el-timeline-item
                                v-for="item in this.competitionUserRelationList"
                                :timestamp="item.time"
                                placement="top">
                            <el-card>
                                <h4>报名比赛</h4>
                                <p v-if="item.teamFlag == 1">
                                    <el-button type="text" @click="toTeamInfo(item.teamName)">
                                        {{ item.teamName }}
                                    </el-button>
                                    团队报名于 {{ item.time }}
                                </p>
                                <p v-if="item.singleFlag == 1">
                                    <el-button type="text" @click="toUserInfo(item.userId)">
                                        {{ item.userName }}
                                    </el-button>
                                    个人报名于 {{ item.time }}
                                </p>
                            </el-card>
                        </el-timeline-item>
                        <p v-if="loading">加载中...</p>
                        <p v-if="noCompetitoinUserRelatition&&noMore">没有更多了</p>
                    </el-timeline>
                </div>
            </el-col>
        </el-row>

        <el-dialog
                title="报名"
                :visible.sync="applyDialogVisible"
                width="50%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="比赛名称">
                    <span>{{ form.competitionName }}</span>
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
    import {
        getCompetitionByCompetitionId,
        applyJoinCompetition,
        listCompetitionUserRelation
    } from '@/network/api/competition'

    export default {
        name: "Info",
        data() {
            return {
                // 是否正在加载
                isLoading: '',
                //比赛信息
                form: {
                    id: '',
                    competitionId: '',
                    competitionName: '',
                    description: '',
                    time: ['', ''],
                    startTime: '',
                    endTime: '',
                    registrationTime: '',
                    registrationFlag: '',
                    position: '',
                    teamFlag: '',
                    teamName: '',
                    personFlag: '',
                    showFlag: '',
                    userId: '',
                    userName: '',
                },
                //报名单选
                radio: '',
                //报名弹出框
                applyDialogVisible: false,
                //查询条件
                competitionUserRelationQueryParam: {
                    competitionId: this.$route.query.competitionId,
                    pageNum: 1,
                    pageSize: 5,
                },
                //报名列表
                competitionUserRelationList: [],
                //报名列表总数
                total: '',
                //报名列表加载
                loading: false,
                //当前步骤
                activeStep: 1,
                //报名按钮
                applyButton: true
            }
        },
        created() {
            this.isLoading = true
            this.init()
            this.isLoading = false
        },
        computed: {
            noCompetitoinUserRelatition() {
                return this.total != 0;
            },
            noMore() {
                return this.competitionUserRelationQueryParam.pageSize >= this.total
            },
            disabled() {
                return this.loading || this.noMore
            },
        },
        methods: {
            init() {
                this.getCompetitionByCompetitionId(this.$route.query.competitionId)
                this.listCompetitionUserRelation(this.competitionUserRelationQueryParam)
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
                    this.form = res.data
                    this.form.time = [this.form.startTime, this.form.endTime]
                    //处理比赛状态
                    this.computeStep()
                })
            },
            //处理活动状态
            computeStep() {
                let date = new Date();
                let startTime = new Date(Date.parse(this.form.startTime));
                let endTime = new Date(Date.parse(this.form.endTime));
                let registrationTime = new Date(Date.parse(this.form.registrationTime));
                if (this.form.registrationFlag == 1) {
                    this.activeStep = 2;
                    return this.applyButton = true;
                }
                if (date < registrationTime) {
                    this.activeStep = 1;
                    return this.applyButton = false;
                }
                if (date >= registrationTime && date <= startTime) {
                    this.activeStep = 2;
                    return this.applyButton = true;
                }
                if (date >= startTime && date <= endTime) {
                    this.activeStep = 3;
                    return this.applyButton = true;
                }
                if (date > endTime) {
                    this.activeStep = 4;
                    return this.applyButton = true;
                }
            },
            //无限滚动
            load() {
                this.loading = true
                this.competitionUserRelationQueryParam.pageSize += 5
                this.listCompetitionUserRelation(this.competitionUserRelationQueryParam)
                this.loading = false
            },
            //获取报名信息
            listCompetitionUserRelation(competitionUserRelationQueryParam) {
                listCompetitionUserRelation(competitionUserRelationQueryParam).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.competitionUserRelationList = res.data.list
                    this.total = res.data.total
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
            },
            //去比赛页面
            toCompetition() {
                this.$router.push('/competition')
            },
            //跳转团队信息
            toTeamInfo(teamName) {
                this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
            },
            //跳转用户信息
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId: userId}});
            },
        }
    }
</script>

<style scoped>
</style>