<template>
    <div class="big-app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organizationList'}">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.organization.year }}{{ this.organization.organizationName }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <!--班级信息-->
        <h3>
            <span>{{ this.organization.year }}</span>
            <span>{{ this.organization.organizationName }}</span>
        </h3>
        <span>班级人数：</span><span>{{ this.organization.userCount }}</span>
        <el-divider></el-divider>
        <!--学生列表-->
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6" v-for="user in this.list" :key="user">
                <el-card shadow="hover">
                    <div class="info">
                        <UserInfo :user="user"/>
                        <el-divider direction="vertical"></el-divider>
                        <el-link :underline="false" type="primary" @click="toTeamInfo(user.teamName)">
                            {{ user.teamName|ellipsis }}
                        </el-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UserInfo from "@/component/UserInfo";
import {getOrganizationByYearAndName, listOrganizationUser} from '@/network/api/organization';

export default {
    name: "index",
    components: {
        UserInfo
    },
    data() {
        return {
            organization: {},
            list: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载',
            });
            this.getOrganizationByYearAndName();
            this.getList();
            loading.close();
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
                console.log(res.data)
                if (res.data==null){
                    this.$message.error("班级信息已被删除");
                    return this.$router.push('/organizationList')
                }
                this.organization = res.data
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
        //跳转申请列表
        toApplicationList() {
            this.$router.push({
                name: 'ApplicationList', query: {
                    year: this.$route.query.year,
                    name: this.$route.query.name
                }
            });
        },
    },
    filters: {
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 8) {
                return value.slice(0, 8) + '...'
            }
            return value
        },
    }
}
</script>

<style scoped lang="scss">
.el-col {
    margin-bottom: 20px;
}

.info {
    display: flex;
    align-items: center;

    .right {
        display: flex;
        flex-direction: column;
        margin-left: 15px;

        .name {
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 500;
        }

        .userId {
            font-size: 12px;
        }
    }
}
</style>