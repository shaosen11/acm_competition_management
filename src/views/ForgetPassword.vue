<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>忘记密码</span>
            </div>
            <!--rules绑定date的rules-->
            <el-form ref="forgetPasswordForm" :rules="rules" :model="form" label-width="80px">
                <!--prop绑定rules的属性-->
                <el-form-item label="账号" prop="userId">
                    <el-input
                        v-model="form.userId"
                        placeholder="请输入要重置密码的账号"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                        v-model="form.email"
                        placeholder="请输入账号绑定的邮箱"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-row :gutter="10" type="flex" justify="center">
                    <el-button
                        type="primary"
                        @click="forgetPassword"
                        :loading="this.isLoading"
                            round>发送至绑定邮箱
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
import {forgetPassword} from '@/network/api/user'

export default {
    name: "ForgetPassword",
    data() {
        return {
            isLoading: false,
            /*表单数据一般封装为一个对象*/
            form: {
                userId: '',
                email: '',
            },
            /*校验规则*/
            rules: {
                userId: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min: 3, max: 16, message: '长度在3到16之间', trigger: 'blur'},
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {
                        pattern: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
                        message: '邮箱格式不对',
                        trigger: 'blur'
                    },
                ],
            }
        }
    },
    methods: {
        toLogin() {
            this.$router.push('/login')
        },
        forgetPassword(){
            forgetPassword(this.form).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.$message.success(res.message);
                this.toLogin()
            })
        }
    }
}
</script>

<style scoped>
.box-card {
    width: 480px;
    margin: auto;
    transform: translateY(75%);
}
</style>