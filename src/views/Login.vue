<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-link type="primary" @click="toHome">主页</el-link>
            </div>
            <!--rules绑定date的rules-->
            <el-form ref="loginForm" :rules="rules" :model="form" label-width="80px">
                <!--prop绑定rules的属性-->
                <el-form-item label="账号" prop="userId">
                    <el-input v-model="form.userId" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <!--绑定rem，如果勾选，存储账号和密码-->
                    <el-checkbox v-model="form.rem" label="记住密码"></el-checkbox>
                </el-form-item>
                <el-row :gutter="10" type="flex" justify="center">
                    <!--loading防止重复点击-->
                    <el-button type="primary"
                               @click="login"
                               :loading="isLoading"
                               element-loading-text="努力加载中..."
                               v-loading.fullscreen.lock="isLoading"
                               round>登陆
                    </el-button>
                    <el-button type="info" @click="toRegister" round>注册</el-button>
                </el-row>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {login} from '@/network/api/user'
    import {setCookie, getCookie, removeCookie} from '@/plugins/cookies';

    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {
                isLoading: false,
                /*表单数据一般封装为一个对象*/
                form: {
                    userId: '',
                    password: '',
                    rem: false
                },
                /*校验规则*/
                rules: {
                    userId: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在3到20之间', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在6到18之间', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {},
        /*初始化的时候，从cookies中获取用户信息*/
        created() {
            this.form.userId = getCookie('userId')
            this.form.password = getCookie('password')
        },
        mounted() {

        },
        methods: {
            login() {
                /*点击登录的时候，防止重复点击*/
                this.isLoading = true
                /*验证登录表达*/
                this.$refs.loginForm.validate(async (valid) => {
                    if (!valid) {
                        this.isLoading = false;
                        return false;
                    }
                    const res = await login(this.form.userId, this.form.password)
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                        this.isLoading = false;
                        return false;
                    }
                    const data = res.data;
                    if (!data) {
                        this.isLoading = false;
                        return false;
                    }
                    const token = data.tokenHead + data.token;
                    /*设置vuex的用户信息*/
                    await this.$store.dispatch('LoginSuccess', token);
                    await this.$store.dispatch('SetUserInfo', this.form.userId);
                    await this.$store.dispatch('SetTeamInfo', this.form.userId);
                    window.sessionStorage.setItem('token', token);
                    if (this.form.rem) {
                        setCookie('userId', this.form.userId, '7D');
                        setCookie('password', this.form.password, '7D');
                    } else {
                        removeCookie('userId');
                        removeCookie('password');
                    }
                    this.isLoading = false
                    this.$message.success("登录成功");
                    await this.$router.replace('/');
                })
            },
            reset() {
                this.$refs['loginForm'].resetFields();
            },
            toHome() {
                this.$router.push('/')
            },
            toRegister() {
                this.$router.push('/register')
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }

    .box-card {
        width: 480px;
        margin: auto;
        transform: translateY(50%);
    }

</style>
