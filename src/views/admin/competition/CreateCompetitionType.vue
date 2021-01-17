<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toCompetitionType" content="创建比赛类型">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                            ref="createCompetitionTypeForm"
                            v-loading="isLoading"
                            :model="form"
                            :rules="rules"
                            label-width="120px">
                        <el-form-item label="比赛类型" prop="name">
                            <el-input
                                    v-model="form.name"
                                    placeholder="比赛名称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input
                                    type="textarea"
                                    v-model="form.description"
                                    placeholder="比赛描述"
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
    import {createCompetitionType, getByCompetitionTypeName} from '@/network/api/competition';

    export default {
        name: "CreateCompetitionType",
        data() {
            let validateCompetitionTypeName = (rule, value, callback) => {
                this.validateCompetitionTypeName(this.form.name).then(res => {
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
                    showFlag: 0,
                    userId: this.$store.state.user.userId,
                    userName: this.$store.state.user.name,
                },
                isLoading: false,
                buttonLoading: false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {
                            required: true, validator: validateCompetitionTypeName, trigger: 'blur'
                        }
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            //异步验证用户账号
            async validateCompetitionTypeName(name) {
                return await getByCompetitionTypeName(name).then(res => {
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
                this.$refs.createCompetitionTypeForm.validate(async (valid) => {
                    if (!valid) {
                        this.buttonLoading = false;
                        return false;
                    }
                    const res = await createCompetitionType(this.form)
                    if (res.code !== 200) {
                        this.buttonLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.buttonLoading = false;
                    await this.$router.push("/admin/competitionType")
                })
            },
            //比赛类型列表
            toCompetitionType() {
                this.$router.push("/admin/competitionType")
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>