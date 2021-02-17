<template>
    <div class="app-container">
        <el-row :gutter="10" type="flex" justify="center">
            <!--个人信息-->
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                        <el-button
                            v-if="this.$route.query.userId==this.$store.state.user.userId"
                            style="float: right; padding: 3px 0"
                            type="text"
                            @click="toUserSetting">
                            设置
                        </el-button>
                    </div>
                    <!--个人信息-->
                    <el-form ref="form"
                             :model="form"
                             label-width="80px"
                             v-loading="isLoading"
                             element-loading-text="努力加载中...">
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-col :span="12">
                                <el-form-item label="学号">
                                    <span>{{ form.userId }}</span>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <span>{{ form.userName }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-avatar :size="100"
                                           :src="form.userIcon"></el-avatar>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="10">
                                <el-form-item label="年级">
                                    <span>{{ form.organizationYear }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="班级">
                                    <span>{{ form.organizationName }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!--队伍信息-->
                        <el-row :gutter="20" type="flex" justify="center">
                            <el-col :span="20">
                                <el-divider><i class="iconfont el-icon-third-team" style="margin:0px 10px"></i>
                                    <el-link
                                        type="primary"
                                        :underline="false"
                                        @click="toTeamInfo(teamName)">{{ teamName }}
                                    </el-link>
                                </el-divider>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <team-info ref="teamInfo" :users="this.users"/>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>

            <!--解题报告-->
            <el-col :span="8">
                <report-list :user-id="this.$route.query.userId"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TeamInfo from "@/component/TeamInfo";
import ReportList from "./components/ReportList";
import {getUserInfo} from '@/network/api/user';
import {getOrganizationByUserId} from '@/network/api/organization';
import {getTeamAllInfoByUserId} from "@/network/api/team";


export default {
    name: "Info",
    components: {
        TeamInfo,
        ReportList,
    },
    data() {
        return {
            // 是否正在加载
            isLoading: '',
            form: {
                userId: '',
                userName: '',
                userIcon: '',
                organizationYear: '',
                organizationName: '',
            },
            teamName: '',
            users: ''
        }
    },
    created() {
        //初始化
        this.init(this.$route.query.userId)
    },
    methods: {
        //初始化方法
        init(userId) {
            this.isLoading = true;
            this.getUserInfo(userId);
            this.getOrganization(userId);
            this.getTeamAllInfoByUserId(userId);
            this.isLoading = false;
        },
        //获取用户信息
        getUserInfo(userId) {
            getUserInfo(userId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.form.userId = res.data.userId;
                this.form.userName = res.data.name;
                this.form.userIcon = res.data.icon;
            })
        },
        //获取班级信息
        getOrganization(userId) {
            getOrganizationByUserId(userId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.form.organizationYear = res.data.year;
                this.form.organizationName = res.data.name;
            })
        },
        getTeamAllInfoByUserId(userId) {
            getTeamAllInfoByUserId(userId).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                if (res.data.team != null) {
                    const team = res.data.team;
                    this.teamName = team.name;
                    this.users = res.data.users;
                }
            })
        },
        //个人设置中心
        toUserSetting() {
            this.$router.push('/user/setting')
        },
        toTeamInfo(teamName) {
            this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
        }
    }
}
</script>

<style scoped>

</style>