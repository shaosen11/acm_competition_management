<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                <!--个人信息-->
                <el-col :span="16">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人信息</span>
                            <el-button style="float: right; padding: 3px 0"
                                       type="text"
                                       @click="toUpdateUserInfo"
                                       v-if="this.$store.state.user.userId==this.$route.query.userId">修改
                            </el-button>
                        </div>

                        <!--个人信息-->
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-col :span="12">
                                <el-form-item label="学号">
                                    <span>{{form.userId}}</span>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <span>{{form.userName}}</span>
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
                                    <span>{{form.organizationYear}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="班级">
                                    <span>{{form.organizationName}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!--队伍信息-->
                        <el-row type="flex" justify="center">
                            <el-col :span="20">
                                <el-divider>队伍信息</el-divider>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <team-info ref="teamInfo" :user-id="this.form.userId"/>
                        </el-row>
                    </el-card>
                </el-col>

                <!--解题报告-->
                <el-col :span="8">
                    <report-list :user-id="this.form.userId"/>
                </el-col>
            </el-row>
        </el-form>
        <update :dialogFormVisible="dialogFormVisible"
                @dialogFormVisibleFasle="dialogFormVisibleFasle"
                @updateUserInfo="updateUserInfo"/>
    </div>


</template>

<script>
    import TeamInfo from "./components/TeamInfo";
    import ReportList from "./components/ReportList";
    import Update from "./Update";
    import {getUserInfo, updateUserInfo, getOrganizationByUserId} from '@/network/api/user';

    export default {
        name: "userInfo",
        components: {
            Update,
            TeamInfo,
            ReportList
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    userId: '',
                    userName: '',
                    userIcon: '',
                    organizationYear: '',
                    organizationName: '',
                }
            }
        },
        props: {},
        computed:{
        },
        created() {
            this.init(this.$route.query.userId)
        },
        mounted () {
        },
        methods: {
            init(userId){
                this.getUserInfo(userId);
                this.getOrganization(userId);
            },
            toUpdateUserInfo() {
                this.dialogFormVisible = true
            },
            dialogFormVisibleFasle() {
                this.dialogFormVisible = false
            },
            updateUserInfo(user){
                updateUserInfo(user).then(res => {
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    this.$store.dispatch('SetUserInfo', this.$store.state.user.userId);
                    this.$refs.teamInfo.getTeamAllInfoByUserId(this.$store.state.user.userId);
                    this.dialogFormVisible = false;
                })
            },
            getUserInfo(userId){
                getUserInfo(userId).then(res =>{
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    this.form.userId = res.data.userId;
                    this.form.userName = res.data.name;
                    this.form.userIcon = res.data.icon;
                })
            },
            getOrganization(userId){
                getOrganizationByUserId(userId).then(res =>{
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    this.form.organizationYear = res.data.year;
                    this.form.organizationName = res.data.name;
                })
            }

        },
        filter: {
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>