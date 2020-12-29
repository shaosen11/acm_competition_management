<template>
    <div>
        <el-tabs tab-position="left" style="height: 500px;" type="border-card">
            <el-tab-pane label="个人设置">
                <h4>个人设置</h4>
                <el-row :gutter="10" type="flex" justify="center">
                    <!--个人信息-->
                    <el-col :span="8">
                        <el-form :model="form">
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
                        </el-form>
                        <el-button
                                type="primary"
                                :loading="updateUserInfoButtonLoading"
                                @click="updateUserInfo"
                                round>修改
                        </el-button>
                    </el-col>
                    <el-col :span="16">
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="安全设置">
                <h4>安全设置</h4>
                <el-row :gutter="10" type="flex">
                    <!--个人信息-->
                    <el-col :span="8">
                        <el-form ref="passwordForm" :model="form" :rules="rules">
                            <el-form-item label="密码" prop="password">
                                <el-input
                                        v-model="form.password"
                                        placeholder="请输入密码"
                                        autocomplete="off"
                                        show-password></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input v-model="form.confirmPassword"
                                          placeholder="请确认密码"
                                          autocomplete="off"
                                          show-password></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button
                                type="primary"
                                :loading="updatePasswordButtonLoading"
                                @click="updatePassword"
                                round>修改
                        </el-button>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getUserInfo, updateUserInfo, updatePassword} from '@/network/api/user';

    export default {
        name: "Setting",
        data() {
            //验证密码
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                //表单数据
                form: {
                    userId: '',
                    username: '',
                    userIcon: '',
                    email: '',
                    gender: '',
                    password: '',
                    confirmPassword: '',
                },
                //修改用户信息按钮加载
                updateUserInfoButtonLoading: false,
                //修改密码按钮加载
                updatePasswordButtonLoading: false,
                /*校验规则*/
                rules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在6到18之间', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, validator: validatePassword, trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.getUserInfo(this.$store.state.user.userId);
        },
        methods: {
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
            //修改密码
            updatePassword() {
                this.updatePasswordButtonLoading = true
                /*验证登录表达*/
                this.$refs.passwordForm.validate(async (valid) => {
                    if (!valid) {
                        this.isLoading = false;
                        return false;
                    }
                    const user = {
                        userId: this.form.userId,
                        password: this.form.password
                    }
                    await updatePassword(user).then(res => {
                        if (res.code != 200) {
                            this.$message.success(res.message);
                            this.updatePasswordButtonLoading = false;
                            return false;
                        }
                        this.updatePasswordButtonLoading = false;
                        this.$store.dispatch('LoginOut');
                        this.$router.push('/loginOut');
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>