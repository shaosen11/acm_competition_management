<template>
    <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toHome">
            首页
        </el-menu-item>
        <el-menu-item index="2" @click="toCompetition">
            比赛
        </el-menu-item>
        <el-menu-item index="3" @click="toReport">
            解题报告
        </el-menu-item>
        <el-menu-item index="4" @click="toBlog">
            论坛
        </el-menu-item>
        <el-menu-item index="5" @click="toTeam">
            队伍列表
        </el-menu-item>
        <el-menu-item index="6" @click="toMessage">
            消息
        </el-menu-item>
        <el-menu-item index="7">
            <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search">
            </el-input>
        </el-menu-item>
        <div v-if="this.isLogin">
            <el-menu-item index="8" style="float: right;">
                <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar :src="this.icon"></el-avatar>
              </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" @click.native="toUserInfo">
                            个人主页
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" @click.native="toLoginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
        </div>
        <div v-else>
            <el-menu-item index="8" style="float: right;" @click="toLogin">
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
                isLogin: '',
                icon: ''
            }
        },
        created() {
            this.initStatus();
        },
        methods: {
            toHome() {
                this.$router.push('/')
            },
            toCompetition() {
                this.$router.push('/competition')
            },
            toReport() {
                this.$router.push('/report')
            },
            toBlog() {
                this.$router.push('/blog')
            },
            toTeam() {
                this.$router.push('/teamList')
            },
            toMessage() {
                this.$router.push('/message')
            },
            toUserInfo() {
                this.$router.push({name: 'userInfo', query: {userId: this.$store.state.user.userId}})
            },
            toLogin() {
                this.$router.push('/login')
            },
            toLoginOut() {
                this.$store.dispatch('LoginOut');
                this.$router.push('/loginOut')
            },
            initStatus() {
                this.isLogin = store.getters.isLogin;
                this.icon = store.getters.icon;
            }
        }
    };
</script>

<style scoped>

</style>