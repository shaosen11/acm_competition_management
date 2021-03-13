<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                        class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toClub">
                        <i class="iconfont el-icon-third-acm"></i>
                        <span slot="title">俱乐部首页</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toActivity">
                        <i class="iconfont el-icon-third-activity"></i>
                        <span slot="title">活动管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toCreateActivity">
                        <i class="iconfont el-icon-third-create"></i>
                        <span slot="title">创建活动</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="toClubUser">
                        <i class="iconfont el-icon-third-usergorup"></i>
                        <span slot="title">会员列表</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="toApplyList">
                        <i class="iconfont el-icon-third-setting"></i>
                        <span slot="title">审批加入</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-container>
                    <transition name="fade" mode="out-in">
                        <router-view name="club"></router-view>
                    </transition>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Management",
        methods: {
            toClub() {
                this.$router.push('/clubInfo')
            },
            toActivity(){
                this.$router.push('/club')
            },
            toApplyList(){
                this.$router.push('/club/applyList')
            },
            toClubUser(){
                this.$router.push('/club/clubUser')
            },
            toCreateActivity() {
                this.$router.push("/club/createActivity")
            },
        }
    }
</script>

<style scoped>

</style>