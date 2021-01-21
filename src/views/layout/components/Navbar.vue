<template>
    <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toHome">
            <i class="iconfont el-icon-third-home"></i>
            首页
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="iconfont el-icon-third-trophy"></i>
                比赛
            </template>
            <el-menu-item index="2-1" @click="toCompetition">
                比赛列表
            </el-menu-item>
            <el-menu-item index="2-2" @click="toCompetitionType">
                比赛类型
            </el-menu-item>
            <el-menu-item index="2-3" @click="toCompetitionProblemType">
                比赛题型
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="toReport">
            <i class="iconfont el-icon-third-file-text"></i>
            解题报告
        </el-menu-item>
        <el-submenu index="4">
            <template slot="title">
                <i class="iconfont el-icon-third-blog"></i>
                博客
            </template>
            <el-menu-item index="4-1" @click="toMyBlogList">
                我的博客
            </el-menu-item>
            <el-menu-item index="4-2" @click="toCreateBlog">
                创建博客
            </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <i class="iconfont el-icon-third-team"></i>
                队伍
            </template>
            <el-menu-item
                    index="5-1"
                    @click="toMyTeam"
                    v-if="this.$store.state.team.myTeamFlag">我的队伍
            </el-menu-item>
            <el-menu-item
                    v-if="!this.$store.state.user.isLogin"
                    index="5-2"
                    @click="toCreateTeam"
                    v-else>创建队伍
            </el-menu-item>
            <el-menu-item index="5-3" @click="toTeamList">队伍列表</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title">
                <i class="iconfont el-icon-third-organization"></i>
                班级
            </template>
            <el-menu-item
                    index="6-1"
                    @click="toMyOrganization"
                    v-if="this.$store.state.organization.myOrganizationFlag">我的班级
            </el-menu-item>
            <el-menu-item index="6-2" @click="toOrganization">班级列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="7" @click="toMessage">
            <i class="iconfont el-icon-third-message"></i>
            消息
        </el-menu-item>
        <el-menu-item index="8">
            <el-input
                    placeholder="请输入内容"
                    prefix-icon="iconfont el-icon-third-search">
            </el-input>
        </el-menu-item>
        <div v-if="this.$store.state.user.isLogin">
            <el-menu-item index="9" style="float: right;">
                <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar :src="this.$store.state.user.icon" icon="iconfont el-icon-third-user"></el-avatar>
              </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="iconfont el-icon-third-user" @click.native="toUserInfo">
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item icon="iconfont el-icon-third-setting" @click.native="toUserSetting">
                            个人设置
                        </el-dropdown-item>
                        <el-dropdown-item
                                v-if="this.$store.state.user.identityFlag==1"
                                icon="iconfont el-icon-third-control"
                                @click.native="toAdmin">
                            后台管理
                        </el-dropdown-item>
                        <el-dropdown-item icon="iconfont el-icon-third-logout" @click.native="toLoginOut">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
        </div>
        <div v-else>
            <el-menu-item index="10" style="float: right;" @click="toLogin">
                登录
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script>
    import store from '@/store'

    export default {
        name: "Navbar",
        data() {
            return {
                icon: '',
            }
        },
        created() {
            this.init();
        },
        methods: {
            toHome() {
                this.$router.push('/')
            },
            toCompetition() {
                this.$router.push('/competition')
            },
            toCompetitionType(){
                this.$router.push('/competitionType')
            },
            toCompetitionProblemType(){
                this.$router.push('/competitionProblemType')
            },
            toReport() {
                this.$router.push('/report')
            },
            toMyBlogList() {
                this.$router.push('/blogList')
            },
            toCreateBlog() {
                this.$router.push('/blogCreate')
            },
            toMyTeam() {
                this.$router.push({name: 'teamInfo', query: {teamName: this.$store.state.team.teamName}})
            },
            toTeamList() {
                this.$router.push('/teamList')
            },
            toCreateTeam() {
                this.$router.push("/teamCreate")
            },
            toMyOrganization() {
                this.$router.push({
                    name: 'organizationInfo',
                    query: {
                        year: this.$store.state.organization.year,
                        name: this.$store.state.organization.organizationName
                    }
                })
            },
            toOrganization() {
                this.$router.push('/organizationList')
            },
            toMessage() {
                this.$router.push('/message')
            },
            toUserInfo() {
                this.$router.push({name: 'userInfo', query: {userId: this.$store.state.user.userId}})
            },
            toUserSetting() {
                this.$router.push('/user/setting')
            },
            toAdmin() {
                this.$router.push('/admin')
            },
            toLogin() {
                this.$router.push('/login')
            },
            toLoginOut() {
                this.$store.dispatch('LoginOut');
                this.$router.push('/loginOut')
            },
            init() {
                this.icon = store.getters.icon;
            },
        }
    };
</script>

<style scoped>

</style>