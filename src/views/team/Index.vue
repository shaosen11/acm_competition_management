<template>
    <div class="app-container">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toInfo">
                        <span slot="title">队伍首页</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toSetting">
                        <span slot="title">队伍设置</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="toApplyList">
                        <span slot="title">申请列表</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-container>
                    <transition name="fade" mode="out-in">
                        <router-view name="team"></router-view>
                    </transition>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
    name: "Index",
    methods: {
        toInfo() {
            this.$router.push({name: 'teamInfo', query: {teamName: this.$store.state.team.teamName}})
        },
        //跳转设置
        toSetting() {
            this.$router.push('/team/setting');
        },
        //跳转申请列表
        toApplyList() {
            this.$router.push('/team/applyList');
        }
    }
}
</script>

<style scoped>
</style>