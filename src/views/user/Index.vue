<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toUserInfo">
                        <i class="iconfont el-icon-third-user"/>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toSetting">
                        <i class="iconfont el-icon-third-setting"/>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toUserDaily">
                        <i class="iconfont el-icon-third-barchart"/>
                        <span slot="title">个人数据</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="toUserStore">
                        <i class="iconfont el-icon-third-follow"/>
                        <span slot="title">个人收藏</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="toUserFollow">
                        <i class="iconfont el-icon-third-heart"/>
                        <span slot="title">个人关注</span>
                    </el-menu-item>
                    <el-menu-item index="6" @click="toPassword">
                        <i class="iconfont el-icon-third-security"/>
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
        toUserDaily() {
            this.$router.push('/user/userDaily');
        },
        //跳转安全设置
        toPassword() {
            this.$router.push('/user/password');
        },
        //跳转个人收藏
        toUserStore() {
            this.$router.push('/user/userStore');
        },
        //跳转个人关注
        toUserFollow() {
            this.$router.push('/user/userFollow');
        }
    }
}
</script>

<style scoped>

</style>