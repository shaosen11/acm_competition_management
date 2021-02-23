<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toOnlineJudge" content="创建OJ系统">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                            ref="createOnlineJudgeForm"
                            v-loading="isLoading"
                            :model="form"
                            :rules="rules"
                            label-width="120px">
                        <el-form-item label="OJ名称" prop="name">
                            <el-input
                                    v-model="form.name"
                                    placeholder="OJ名称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="OJ网址" prop="url">
                            <el-input
                                    v-model="form.url"
                                    placeholder="OJ网址"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input
                                    type="textarea"
                                    v-model="form.description"
                                    placeholder="OJ描述"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否展示">
                            <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="form.showFlag"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    @click="create"
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
    import {createOnlineJudgeSystem, getByOnlineJudgeSystemName} from '@/network/api/report';

    export default {
        name: "CreateOnlineJudge",
        data() {
            let validateOnlineJudgeSystemName = (rule, value, callback) => {
                this.validateOnlineJudgeSystemName(this.form.name).then(res => {
                    if (res) {
                        callback(new Error('名称已存在!'))
                    } else {
                        callback()
                    }
                })
            }
            return {
                form: {
                    name: '',
                    description: '',
                    url: '',
                    showFlag: 1,
                    userId: this.$store.state.user.userId,
                },
                isLoading: false,
                buttonLoading: false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {
                            required: true, validator: validateOnlineJudgeSystemName, trigger: 'blur'
                        }
                    ],
                    url: [
                        {required: true, message: '请输入网址', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            //异步验证用户账号
            async validateOnlineJudgeSystemName(name) {
                return await getByOnlineJudgeSystemName(name).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    if (res.data != null) {
                        if (res.data.id != null) {
                            return true;
                        }
                    }
                    return false
                })
            },
            //创建比赛类型
            create() {
                this.buttonLoading = true;
                this.$refs.createOnlineJudgeForm.validate(async (valid) => {
                    if (!valid) {
                        this.buttonLoading = false;
                        return false;
                    }
                    const res = await createOnlineJudgeSystem(this.form)
                    if (res.code !== 200) {
                        this.buttonLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.buttonLoading = false;
                    await this.$router.push("/admin/onlineJudge")
                })
            },
            //比赛类型列表
            toOnlineJudge() {
                this.$router.push("/admin/onlineJudge")
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