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
            <el-dropdown style="float: right; margin-left: 15px" v-if="this.organizationCheckFlag==true">
                <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="outOrganization">
                        退出班级
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
    import {getOrganizationByYearAndName, listOrganizationUser, outOrganization} from '@/network/api/organization';

    export default {
        name: "index",
        components: {
            UserInfo
        },
        data() {
            return {
                organization: {},
                list: [],
                organizationCheckFlag: false
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
                this.organizationCheck();
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
                    if (res.data == null) {
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
            outOrganization() {
                const organizationUserRelation = {
                    organizationId: this.organization.organizationId,
                    userId: this.$store.state.user.userId,
                }
                outOrganization(organizationUserRelation).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.$store.dispatch('deleteOrganizationInfo');
                    this.$router.push('/organizationList')
                })
            },
            organizationCheck() {
                if (this.$route.query.year == this.$store.state.organization.year && this.$route.query.name == this.$store.state.organization.organizationName) {
                    this.organizationCheckFlag = true;
                }
            },
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 6) {
                    return value.slice(0, 6) + '...'
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