<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toUserInfo">
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toSetting">
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toPassword">
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
        }
    }
}
</script>

<style scoped>
.el-aside {
    margin: 10px;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
    width: 100%;
}
</style>