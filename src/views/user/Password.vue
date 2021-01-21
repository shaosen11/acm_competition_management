<template>
    <div class="app-container">
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>安全设置</span>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                        ref="passwordForm"
                        :model="form"
                        :rules="rules"
                        label-width="80px">
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
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="updatePasswordButtonLoading"
                                @click="updatePassword"
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
import {updatePassword} from "@/network/api/user";

export default {
    name: "Password",
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
                password: '',
                confirmPassword: '',
            },
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
    methods: {
        //修改密码
        updatePassword() {
            this.updatePasswordButtonLoading = true
            /*验证登录表达*/
            this.$refs.passwordForm.validate(async (valid) => {
                if (!valid) {
                    this.updatePasswordButtonLoading = false;
                    return false;
                }
                const user = {
                    userId: this.$store.state.user.userId,
                    password: this.form.password
                }
                await updatePassword(user).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
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
.table-container {
    width: 1000px;
}
</style>