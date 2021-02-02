<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toUserInfo">
                        <i class="iconfont el-icon-third-user"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toSetting">
                        <i class="iconfont el-icon-third-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toStore">
                        <i class="iconfont el-icon-third-heart"></i>
                        <span slot="title">个人收藏</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="toPassword">
                        <i class="iconfont el-icon-third-security"></i>
                        <span slot="title">安全设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-container>
                    <transition name="fade" mode="out-in">
                        <router-view name="user"></router-view>
                    </transition>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
    name: "userInfo",
    methods: {
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