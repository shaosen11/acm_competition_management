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
                    <el-dropdown-item>
                        申请加入
                    </el-dropdown-item>
                    <el-dropdown-item>
                        退出俱乐部
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </h3>
        <span>俱乐部人数：</span><span>12</span>
        <el-divider></el-divider>
<!--        <el-carousel :interval="4000" type="card" height="200px">-->
<!--            <el-carousel-item v-for="item in 6" :key="item">-->
<!--                <h3 class="medium">{{ item }}</h3>-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
    </div>
</template>

<script>
    export default {
        name: "Club",
        methods:{
            toClubIndex(){
                this.$router.push('/club')
            }
        }
    }
</script>

<style scoped>
</style>