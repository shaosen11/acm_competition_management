<template>
    <div>
        <el-card class="index-container">
            <div slot="header" class="clearfix">
                <span>个人设置</span>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form :model="user"
                             label-width="100px">
                        <el-form-item label="头像：" prop="logo">
                            <single-upload :value="user.userIcon" @iconUrl="iconUrl"></single-upload>
                        </el-form-item>
                        <el-form-item label="学号">
                            <el-input v-model="user.userId" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="user.username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="user.email" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="github" prop="githubLink">
                            <el-input v-model="user.githubLink"></el-input>
                        </el-form-item>
                        <el-form-item label="gitee" prop="giteeLink">
                            <el-input v-model="user.giteeLink"></el-input>
                        </el-form-item>
                        <el-form-item label="csdn" prop="csdnLink">
                            <el-input v-model="user.csdnLink"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <template>
                                <el-radio v-model="user.gender" label="1"><i class="el-icon-female"></i>男</el-radio>
                                <el-radio v-model="user.gender" label="0"><i class="el-icon-male"></i>女</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    :loading="updateUserInfoButtonLoading"
                                    @click="updateUserInfo"
                                    round>修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {getUserInfo, updateUserInfo} from '@/network/api/user';
    import SingleUpload from "@/component/SingleUpload";

    export default {
        name: "Setting",
        components: {
            SingleUpload
        },
        data() {
            return {
                isLoading: false,
                //表单数据
                user: {
                    userId: '',
                    name: '',
                    icon: '',
                    email: '',
                    gender: '',
                    githubLink: '',
                    giteeLink: '',
                    csdnLink: '',
                },
                //修改用户信息按钮加载
                updateUserInfoButtonLoading: false,
            }
        },
        created() {
            this.init()
        },
        methods: {
            //初始化
            init() {
                this.getUserInfo(this.$store.state.user.userId);
            },
            //获取用户信息
            getUserInfo(userId) {
                getUserInfo(userId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.user = res.data
                })
            },
            //修改用户信息
            updateUserInfo() {
                this.updateUserInfoButtonLoading = true;
                updateUserInfo(this.user).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        this.updateUserInfoButtonLoading = false;
                        return false;
                    }
                    this.$store.dispatch('SetUserAllInfo', this.$store.state.user.userId);
                    this.updateUserInfoButtonLoading = false;
                    this.$message.success(res.message);
                    this.getUserInfo(this.$store.state.user.userId);
                })
            },
            iconUrl(iconUrl) {
                this.user.icon = iconUrl;
            },
        }
    }
</script>

<style scoped>
</style>