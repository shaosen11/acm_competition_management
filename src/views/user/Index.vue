<template>
    <div>

        <el-row :gutter="10" type="flex" justify="center">
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
                        <el-row type="flex" justify="center">
                            <el-col :span="20">
                                <el-divider>队伍信息</el-divider>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <team-info ref="teamInfo" :user-id="this.form.userId"/>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>

            <!--解题报告-->
            <el-col :span="8">
                <report-list :user-id="this.form.userId"/>
            </el-col>

        </el-row>
        <update :dialogUpdateFormVisible="dialogUpdateFormVisible"
                @dialogUpdateFormVisibleFasle="dialogUpdateFormVisibleFasle"
                @updateUserInfo="updateUserInfo"/>
    </div>


</template>

<script>
import TeamInfo from "./components/TeamInfo";
import ReportList from "./components/ReportList";
import Update from "./Update";
import {getUserInfo, updateUserInfo} from '@/network/api/user';
import {getOrganizationByUserId} from '@/network/api/organization'

export default {
    name: "userInfo",
    components: {
        Update,
        TeamInfo,
        ReportList
    },
    data() {
        return {
            // 是否正在加载
            isLoading: '',
            // 是否展示修改表单
            dialogUpdateFormVisible: false,
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
    computed: {},
    created() {
        //初始化
        this.init(this.$route.query.userId)
    },
    mounted() {
    },
    methods: {
        //初始化方法
        init(userId) {
            this.isLoading = true;
            this.getUserInfo(userId);
            this.getOrganization(userId);
            this.isLoading = false;
        },
        //获取用户信息
        getUserInfo(userId) {
            getUserInfo(userId).then(res => {
                if (res.code != 200) {
                    return this.$message.success(res.message);
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
                    this.$message.success(res.message);
                }
                this.form.organizationYear = res.data.year;
                this.form.organizationName = res.data.name;
            })
        },
        //隐藏修改表单
        dialogUpdateFormVisibleFasle() {
            this.dialogUpdateFormVisible = false
        },
        //显示修改表单
        toUpdateUserInfo() {
            this.dialogUpdateFormVisible = true
        },
        //修改用户信息
        updateUserInfo(user) {
            updateUserInfo(user).then(res => {
                if (res.code != 200) {
                    this.$message.success(res.message);
                }
                this.$store.dispatch('SetUserInfo', this.$store.state.user.userId);
                this.init(this.$store.state.user.userId);
                this.$refs.teamInfo.getTeamAllInfoByUserId(this.$store.state.user.userId);
                this.dialogUpdateFormVisible = false;
            })
        },

    },
    filter: {},
    watch: {}
}
</script>

<style scoped>

</style>