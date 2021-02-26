<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toTeacher" content="添加老师">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                            ref="registerForm"
                            v-loading="isLoading"
                            :model="form"
                            :rules="rules"
                            label-width="120px">
                        <el-form-item label="老师名称" prop="name">
                            <el-input
                                    v-model="form.name"
                                    placeholder="老师名称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="老师账号" prop="userId">
                            <el-input
                                    v-model="form.userId"
                                    placeholder="老师账号"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="老师邮箱" prop="email">
                            <el-input
                                    v-model="form.email"
                                    placeholder="老师邮箱"
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
                        <el-form-item label="是否可用">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="form.showFlag"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    @click="register"
                                    :loading="this.buttonLoading"
                                    round>创建
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {insertTeacher, getByUserId, getByEmail} from '@/network/api/user'

    export default {
        name: "CreateTeacher",
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
                form: {
                    name: '',
                    userId: '',
                    email: '',
                    showFlag: 1,
                    userId: '',
                    identityFlag: 1
                },
                isLoading: false,
                buttonLoading: false,
                /*校验规则*/
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 16, message: '长度在3到16之间', trigger: 'blur'},
                        {required: true, validator: validateUserId, trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
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
                console.log(this.form)
                /*点击登录的时候，防止重复点击*/
                this.isLoading = true
                /*验证登录表达*/
                this.$refs.registerForm.validate(async (valid) => {
                    if (!valid) {
                        this.isLoading = false;
                        return false;
                    }
                    const res = await insertTeacher(this.form);
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        this.isLoading = false;
                        return false
                    }
                    this.$message.success(res.message);
                    this.isLoading = false;
                    this.toTeacher();
                })
            },
            toTeacher() {
                this.$router.push("/admin/teacher")
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>