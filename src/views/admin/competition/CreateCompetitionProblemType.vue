<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toCompetitionType" content="创建比赛题型">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                            ref="createCompetitionProblemTypeForm"
                            v-loading="isLoading"
                            :model="form"
                            :rules="rules"
                            label-width="120px">
                        <el-form-item label="父类型" prop="typeId">
                            <el-select
                                    v-model="form.parentId"
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in this.competitionProblemTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="比赛题型" prop="name">
                            <el-input
                                    v-model="form.name"
                                    placeholder="题型名称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input
                                    type="textarea"
                                    v-model="form.description"
                                    placeholder="题型描述"
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
    import {
        createCompetitionProblemType,
        getByCompetitionProblemTypeName,
        listParentCompetitionProblemType
    } from '@/network/api/competition';

    export default {
        name: "CreateCompetitionType",
        data() {
            let validateCompetitionProblemTypeName = (rule, value, callback) => {
                this.validateCompetitionProblemTypeName(this.form.name).then(res => {
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
                    parentId: '',
                    showFlag: 0,
                    userId: this.$store.state.user.userId,
                    userName: this.$store.state.user.name,
                },
                //比赛题型
                competitionProblemTypeList: [],
                isLoading: false,
                buttonLoading: false,
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {
                            required: true, validator: validateCompetitionProblemTypeName, trigger: 'blur'
                        }
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getCompetitionProblemTypeList()
            },
            //获取比赛类型
            getCompetitionProblemTypeList() {
                listParentCompetitionProblemType().then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.competitionProblemTypeList.push({value: res.data[i].id, label: res.data[i].name})
                    }
                })
            },
            //异步验证用户账号
            async validateCompetitionProblemTypeName(name) {
                return await getByCompetitionProblemTypeName(name).then(res => {
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
                this.$refs.createCompetitionProblemTypeForm.validate(async (valid) => {
                    if (!valid) {
                        this.buttonLoading = false;
                        return false;
                    }
                    const res = await createCompetitionProblemType(this.form)
                    if (res.code !== 200) {
                        this.buttonLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.buttonLoading = false;
                    await this.$router.push("/admin/competitionProblemType")
                })
            },
            //比赛类型列表
            toCompetitionType() {
                this.$router.push("/admin/competitionProblemType")
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