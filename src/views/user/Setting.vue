<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>个人设置</span>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form :model="form"
                             label-width="80px">
                        <el-form-item label="学号">
                            <el-input v-model="form.userId" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <template>
                                <el-radio v-model="form.gender" label="1"><i class="el-icon-female"></i>男</el-radio>
                                <el-radio v-model="form.gender" label="0"><i class="el-icon-male"></i>女</el-radio>
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

    export default {
        name: "Setting",
        data() {
            return {
                //表单数据
                form: {
                    userId: '',
                    username: '',
                    userIcon: '',
                    email: '',
                    gender: '',
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
            init(){
                this.getUserInfo(this.$store.state.user.userId);
            },
            //获取用户信息
            getUserInfo(userId) {
                getUserInfo(userId).then(res => {
                    this.form.userId = res.data.userId;
                    this.form.username = res.data.name;
                    this.form.email = res.data.email;
                    this.form.gender = res.data.gender;
                })
            },
            //修改用户信息
            updateUserInfo() {
                this.updateUserInfoButtonLoading = true;
                const user = {
                    userId: this.form.userId,
                    name: this.form.username,
                    icon: '',
                    email: this.form.email,
                    gender: this.form.gender,
                    password: this.form.password
                }
                updateUserInfo(user).then(res => {
                    if (res.code != 200) {
                        this.$message.success(res.message);
                        this.updateUserInfoButtonLoading = false;
                        return false;
                    }
                    this.$store.dispatch('SetUserAllInfo', this.$store.state.user.userId);
                    this.updateUserInfoButtonLoading = false;
                    this.$router.push({name: 'userInfo', query: {userId: this.$store.state.user.userId}})
                })
            },
        }
    }
</script>

<style scoped>
.table-container {
    width: 1000px;
}
</style>