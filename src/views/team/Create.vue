<template>
    <div>
        <el-card class="box-card" width="30%">
            <div slot="header" class="clearfix">
                <el-page-header @back="toTeamList" content="创建队伍">
                </el-page-header>
            </div>
            <el-form ref="CreateForm"
                     :model="form"
                     :rules="rules"
                     label-width="80px">
                <el-form-item label="队伍名称" prop="name">
                    <el-input v-model="form.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="英语昵称" prop="englishName">
                    <el-input v-model="form.englishName">
                    </el-input>
                </el-form-item>
                <el-form-item label="座右铭">
                    <el-input v-model="form.motto"></el-input>
                </el-form-item>
                <el-row :gutter="10" type="flex" justify="center">
                    <el-button
                            type="primary"
                            @click="createTeam"
                            :loading="this.isLoading"
                            round>创建
                    </el-button>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {getTeamByName, getTeamByEnglishName, createTeam} from "@/network/api/team";

    export default {
        name: "Create",
        data() {
            let validateTeamName = (rule, value, callback) => {
                this.validateTeamName(this.form.name).then(res => {
                    if (res) {
                        callback(new Error('队名已存在!'))
                    } else {
                        callback()
                    }
                })
            }
            let validateTeamEnglishName = (rule, value, callback) => {
                this.validateTeamEnglishName(this.form.englishName).then(res => {
                    if (res) {
                        callback(new Error('英语昵称已存在!'))
                    } else {
                        callback()
                    }
                })
            }
            return {
                form: {
                    name: '',
                    englishName: '',
                    motto: ''
                },
                isLoading: false,
                /*校验规则*/
                rules: {
                    name: [
                        {required: true, message: '请输入队名', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在3到15之间', trigger: 'blur'},
                        {required: true, validator: validateTeamName, trigger: 'blur'},
                    ],
                    englishName: [
                        {required: true, message: '请输入英语昵称', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在3到30之间', trigger: 'blur'},
                        {required: true, validator: validateTeamEnglishName, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            //完成队伍信息填写，跳转页面
            createTeam() {
                this.isLoading = true;
                this.$refs.CreateForm.validate(async (valid) => {
                    if (!valid) {
                        this.isLoading = false;
                        return false;
                    }
                    const team = {
                        name: this.form.name,
                        englishName: this.form.englishName,
                        userId: this.$store.state.user.userId,
                        userName: this.$store.state.user.name,
                        motto: this.form.motto
                    };
                    const res = await createTeam(team);
                    if (res.code !== 200) {
                        this.isLoading = false;
                        this.$message.error(res.message);
                        return false;
                    }
                    await this.$store.dispatch('setTeamInfo', this.form.name);
                    this.isLoading = false;
                    await this.$router.push({name: 'teamInfo', query: {teamName: this.form.name}})
                })
            },
            //验证队名是否存在
            async validateTeamName(name) {
                return await getTeamByName(name).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    if (res.data != null && res.data.teamId != null) {
                        return true;
                    }
                    return false
                })
            },
            async validateTeamEnglishName(englishName) {
                return await getTeamByEnglishName(englishName).then(res => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    if (res.data != null) {
                        return true;
                    }
                    return false
                })
            },
            //队伍列表
            toTeamList() {
                this.$router.push('/teamList')
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 480px;
        margin: auto;
        transform: translateY(10%);
    }
</style>