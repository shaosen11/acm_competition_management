<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                        class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toActivity">
                        <i class="iconfont el-icon-third-activity"></i>
                        <span slot="title">活动管理</span>
                    </el-menu-item>
                    <el-menu-item index="2">
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
                this.$router.push('/club')
            },
            toActivity(){
                this.$router.push('/club')
            },
            toUserInfo() {
                this.$router.push({name: 'userInfo', query: {userId: this.$store.state.user.userId}})
            },
            //跳转个人设置
            toSetting() {
                this.$router.push('/user/setting');
            },
            //跳转安全设置
            toPassword() {
                this.$router.push('/user/password');
            },
            //跳转个人收藏
            toStore() {
                this.$router.push('/user/store');
            }
        }
    }
</script>

<style scoped>

</style>