<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>重置密码</span>
            </div>
            <!--rules绑定date的rules-->
            <el-form ref="resetPasswordForm" :rules="rules" :model="form" label-width="80px">
                <!--prop绑定rules的属性-->
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input
                        v-model="form.confirmPassword"
                        placeholder="请确认密码"
                        autocomplete="off"
                        show-password></el-input>
                </el-form-item>
                <el-row :gutter="10" type="flex" justify="center">
                    <el-button
                        type="primary"
                        @click="resetPassword"
                        :loading="this.isLoading"
                        :disabled="this.disabled"
                        round
                    >重置密码
                    </el-button>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {checkResetLink, updatePassword} from '@/network/api/user'

export default {
    name: "ResetPassword",
    data() {
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
            /*表单数据一般封装为一个对象*/
            form: {
                password: '',
                confirmPassword: '',

            },
            disabled: true,
            //修改密码按钮加载
            isLoading: false,
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
        this.init()
    },
    methods: {
        init() {
            this.checkResetLink()
        },
        checkResetLink() {
            const userPasswordDto = {
                sid: this.$route.query.sid,
                userId: this.$route.query.userId
            }
            checkResetLink(userPasswordDto).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.disabled = false
            })
        },
        toLogin() {
            this.$router.push('/login')
        },
        //修改密码
        resetPassword() {
            this.isLoading = true
            /*验证登录表达*/
            this.$refs.resetPasswordForm.validate(async (valid) => {
                if (!valid) {
                    this.isLoading = false;
                    return false;
                }
                const user = {
                    userId: this.$route.query.userId,
                    password: this.form.password
                }
                await updatePassword(user).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        this.isLoading = false;
                        return false;
                    }
                    this.isLoading = false;
                    this.toLogin()
                })
            })
        }
    }
}
</script>

<style scoped>
.box-card {
    width: 480px;
    margin: auto;
    transform: translateY(100%);
}
</style>