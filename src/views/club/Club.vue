<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>俱乐部</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <!--班级信息-->
        <h3>
            <span>acm俱乐部</span>
            <el-dropdown trigger="click" style="float: right;">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toClubIndex">
                        管理页面
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="applyJoinClue">
                        申请加入
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="outClub"
                                      v-if="this.$store.state.club.clubFlag==1||this.$store.state.club.clubFlag==2">
                        退出俱乐部
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </h3>
        <span>俱乐部人数：{{this.clubStatistics.userNumber}}</span>
        <el-divider></el-divider>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="activity in this.activityList" :key="item">
                <el-card>
                    <div @click="toActivityInfo(activity.activityId)">
                        <span class="title">
                         <i class="iconfont el-icon-third-activity" style="margin-right: 5px"/>
                        <span>{{ activity.name }}</span>
                    </span>
                        <p class="content markdown-body" v-dompurify-html="activity.content"></p>
                        <p>
                            <i class="iconfont el-icon-third-location" style="margin-right: 5px"></i>
                            <span>{{ activity.position }}</span>
                        </p>
                        <div class="data">
                            <i class="iconfont el-icon-third-time-circle" style="margin-right: 5px"></i>
                            <span>{{ activity.startTime }}-{{activity.endTime}}</span>
                        </div>
                    </div>
                </el-card>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import {listClubActivity, applyJoinClue, getClubStatistics, outClub} from '@/network/api/club';

    export default {
        name: "Club",
        data() {
            return {
                showFlag: 1,
                activityList: [],
                clubStatistics: {}
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
                this.getList()
                this.getClubStatistics();
                loading.close()
            },
            getList() {
                listClubActivity(this.showFlag).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.activityList = res.data
                })
            },
            getClubStatistics() {
                getClubStatistics().then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.clubStatistics = res.data
                })
            },
            applyJoinClue() {
                applyJoinClue(this.$store.state.user.userId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                })
            },
            outClub() {
                outClub(this.$store.state.user.userId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.$store.dispatch('deleteClubFlag');
                    this.getClubStatistics();
                })
            },
            toClubIndex() {
                this.$router.push('/club')
            },
            toActivityInfo(activityId) {
                this.$router.push({
                    path: '/activityInfo',
                    query: {activityId}
                })
            },
            toActivityInfo(activityId) {
                this.$router.push({
                    path: '/activityInfo',
                    query: {activityId}
                })
            },
        }
    }
</script>

<style scoped>
</style>