<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>注册</span>
            </div>
            <!--rules绑定date的rules-->
            <el-form ref="registerForm" :rules="rules" :model="form" label-width="80px">
                <!--prop绑定rules的属性-->
                <el-form-item label="账号" prop="userId">
                    <el-input
                            v-model="form.userId"
                            placeholder="请输入账号"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input
                            v-model="form.name"
                            placeholder="请输入用户名"
                            autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                            v-model="form.email"
                            placeholder="请输入邮箱"
                            autocomplete="off"></el-input>
                </el-form-item>
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
                            @click="register"
                            :loading="this.isLoading"
                            round>注册
                    </el-button>
                    <el-button
                            type="danger"
                            @click="toLogin"
                            round>返回
                    </el-button>
                </el-row>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {register, getByUserId, getByEmail} from '@/network/api/user'

    export default {
        name: "Register",
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
            var validateUserId = (rule, value, callback) => {
                this.validateUserId(this.form.userId).then(res => {
                    if (res) {
                        callback(new Error('账号已存在!'))
                    } else {
                        callback()
                    }
                })
            }
            var validateEmail = (rule, value, callback) => {
                this.validateEmail(this.form.email).then(res => {
                    if (res) {
                        callback(new Error('邮箱已存在!'))
                    } else {
                        callback()
                    }
                })
            }
            return {
                isLoading: false,
                /*表单数据一般封装为一个对象*/
                form: {
                    userId: '',
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                /*校验规则*/
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 16, message: '长度在3到16之间', trigger: 'blur'},
                        {required: true, validator: validateUserId, trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在6到18之间', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, validator: validatePassword, trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
                            message: '邮箱格式不对',
                            trigger: 'blur'
                        },
                        {required: true, validator: validateEmail, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            toLogin() {
                this.$router.push('/login')
            },
            //异步验证用户账号
            async validateUserId(userId) {
                return await getByUserId(userId).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    if (res.data.userId != null) {
                        return true;
                    }
                    return false
                })
            },
            //异步验证用户邮箱
            async validateEmail(email) {
                return await getByEmail(email).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    if (res.data.userId != null) {
                        return true;
                    }
                    return false
                })
            },
            register() {
                /*点击登录的时候，防止重复点击*/
                this.isLoading = true
                /*验证登录表达*/
                this.$refs.registerForm.validate(async (valid) => {
                    if (!valid) {
                        this.isLoading = false;
                        return false;
                    }
                    const res = await register(this.form);
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        this.isLoading = false;
                        return false
                    }
                    this.$message.success(res.message);
                    this.isLoading = false;
                    this.toLogin();
                })
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 480px;
        margin: auto;
        transform: translateY(25%);
    }
</style>