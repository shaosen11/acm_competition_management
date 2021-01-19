<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organizationList'}">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.organization.year }}{{ this.organization.organizationName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!--班级信息-->
        <el-card class="box-card" shadow="never" style="margin: 50px 0px">
            <h3>{{ this.organization.year }}</h3>
            <p>{{ this.organization.organizationName }}</p>
        </el-card>

        <!--学生列表-->
        <el-row :gutter="20" style="margin: 50px 0px">
            <el-col :span="8" v-for="item in this.list" :key="item">
                <el-card shadow="hover">
                    <el-row :gutter="10">
                        <el-col :span="16">
                             <div>
                                 <h3 @click="toUserInfo(item.userId)">
                                     {{ item.userName }}
                                     <i class="el-icon-male" v-if="item.gender==1" style="color: #409EFF"></i>
                                     <i class="el-icon-female" v-if="item.gender==0" style="color: #409EFF"></i>
                                 </h3>
                                 <p>{{ item.userId }}</p>
                                 <el-link :underline="false" type="primary" @click="toTeamInfo(item.teamName)">{{ item.teamName }}</el-link>
                             </div>
                         </el-col>
                         <el-col :span="8">
                             <el-avatar
                                 :size="60"
                                 :src="item.icon"/>
                         </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getOrganizationByYearAndName, listOrganizationUser} from '@/network/api/organization';

export default {
    name: "index",
    data() {
        return {
            organization: {},
            list: [],
        }
    },
    created() {
        //初始化
        this.init()
    },
    methods: {
        init() {
            this.getOrganizationByYearAndName()
        },
        //获取班级信息
        getOrganizationByYearAndName() {
            const organization = {
                year: this.$route.query.year,
                name: this.$route.query.name
            }
            getOrganizationByYearAndName(organization).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.organization = res.data
                this.getList()
            })
        },
        getList() {
            const OrganizationUserQueryParam = {
                organizationId: this.organization.organizationId,
                year: this.$route.query.year,
                name: this.$route.query.name,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            listOrganizationUser(OrganizationUserQueryParam).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false
                    return this.$message.error(res.message);
                }
                this.list = res.data
            })
        },
        //跳转团队信息
        toTeamInfo(teamName) {
            this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
        },
        //跳转用户信息
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        },
        //跳转申请列表
        toApplicationList() {
            this.$router.push({
                name: 'ApplicationList', query: {
                    year: this.$route.query.year,
                    name: this.$route.query.name
                }
            });
        },
    }
}
</script>

<style scoped>
.el-col {
    margin-bottom: 20px;
}
</style>