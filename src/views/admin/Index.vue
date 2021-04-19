<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toUserLoginAnalysis">
                        <i class="iconfont el-icon-third-barchart"/>
                        <span slot="title">用户登录日志</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toNotice">
                        <i class="iconfont el-icon-third-notification"/>
                        <span slot="title">公告管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toTeacher">
                        <i class="iconfont el-icon-third-laoshi"/>
                        <span slot="title">老师管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="toStudent">
                        <i class="iconfont el-icon-third-student"/>
                        <span slot="title">学生管理</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="iconfont el-icon-third-organization"/>
                            <span>班级管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1" @click="toOrganizationList">班级列表</el-menu-item>
                            <el-menu-item index="5-2" @click="toApplyList">审批加入</el-menu-item>
                            <el-menu-item index="5-3" @click="toCreateOrganization">创建班级</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="6" @click="toTeam">
                        <i class="iconfont el-icon-third-team"/>
                        <span slot="title">队伍管理</span>
                    </el-menu-item>

                    <el-submenu index="7">
                        <template slot="title">
                            <i class="iconfont el-icon-third-trophy"/>
                            <span>比赛管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="7-1" @click="toCompetitionList">比赛列表</el-menu-item>
                            <el-menu-item index="7-2" @click="toCreateCompetition">创建比赛</el-menu-item>
                            <el-menu-item index="7-3" @click="toCompetitionType">比赛类型列表</el-menu-item>
                            <el-menu-item index="7-4" @click="toCreateCompetitionType">创建比赛类型</el-menu-item>
                            <el-menu-item index="7-5" @click="toOnlineJudge">OJ系统列表</el-menu-item>
                            <el-menu-item index="7-6" @click="toCreateOnlineJudge">创建OJ系统</el-menu-item>
                            <el-menu-item index="7-7" @click="toCompetitionPronblemType">题型列表</el-menu-item>
                            <el-menu-item index="7-8" @click="toCreateCompetitionProblemType">创建题型</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="8" @click="toReport">
                        <i class="iconfont el-icon-third-file-text"/>
                        <span slot="title">报告管理</span>
                    </el-menu-item>
                    <el-menu-item index="9" @click="toBlog">
                        <i class="iconfont el-icon-third-blog"/>
                        <span slot="title">论坛管理</span>
                    </el-menu-item>
                    <el-menu-item index="10" @click="toTask">
                        <i class="iconfont  el-icon-third-reloadtime"/>
                        <span slot="title">定时任务</span>
                    </el-menu-item>
                    <el-menu-item index="11" @click="toESManagement">
                        <i class="iconfont el-icon-third-search"/>
                        <span slot="title">ES索引管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-container>
                    <transition name="fade" mode="out-in">
                        <router-view name="admin"></router-view>
                    </transition>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "index",
    methods: {
        toTeacher() {
            this.$router.push("/admin/teacher")
        },
        toStudent() {
            this.$router.push("/admin/student")
        },
        toOrganizationList() {
            this.$router.push("/admin/organizationList")
        },
        toApplyList() {
            this.$router.push("/admin/applyList")
        },
        toCreateOrganization() {
            this.$router.push("/admin/createOrganization")
        },
        toTeam() {
            this.$router.push("/admin/team")
        },
        toCompetitionList() {
            this.$router.push("/admin/competitionList")
        },
        toCreateCompetition(){
            this.$router.push("/admin/createCompetition")
        },
        toCompetitionType() {
            this.$router.push("/admin/competitionType")
        },
        toCreateCompetitionType() {
            this.$router.push("/admin/createCompetitionType")
        },
        toOnlineJudge() {
            this.$router.push("/admin/onlineJudge")
        },
        toCreateOnlineJudge() {
            this.$router.push("/admin/createOnlineJudge")
        },
        toCompetitionPronblemType() {
            this.$router.push("/admin/competitionProblemType")
        },
        toCreateCompetitionProblemType() {
            this.$router.push("/admin/createCompetitionProblemType")
        },
        toReport() {
            this.$router.push("/admin/report")
        },
        toBlog() {
            this.$router.push("/admin/blog")
        },
        toNotice() {
            this.$router.push("/admin/notice")
        },
        toUserLoginAnalysis() {
            this.$router.push("/admin/userLoginAnalysis")
        },
        toESManagement() {
            this.$router.push("/admin/ESManagement")
        },
        toTask(){
            this.$router.push("/admin/task")
        }
    }
}
</script>

<style scoped>
</style>