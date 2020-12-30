<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="toTeacher">
                        <span slot="title">老师管理</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="toStudent">
                        <span slot="title">学生管理</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <span>班级管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1" @click="toOrganizationList">班级列表</el-menu-item>
                            <el-menu-item index="3-2" @click="toApplicationList">审批加入</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="4" @click="toReport">
                        <span slot="title">报告管理</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="toBlog">
                        <span slot="title">论坛管理</span>
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
    data() {
        return {
            defaultActiveIndex: ''
        }
    },
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
        toApplicationList() {
            this.$router.push("/admin/applicationList")
        },
        toReport() {
            this.$router.push("/admin/report")
        },
        toBlog() {
            this.$router.push("/admin/blog")
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
}
</style>