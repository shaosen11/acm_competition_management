<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toCompetitionList" content="创建比赛">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                        ref="createCompetitionForm"
                        v-loading="isLoading"
                        :model="form"
                        :rules="rules"
                        label-width="120px">
                        <el-form-item label="比赛名称" prop="name">
                            <el-input
                                v-model="form.name"
                                placeholder="比赛名称"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛类型" prop="typeId">
                            <el-select
                                v-model="form.typeId"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in this.competitionTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="比赛时间" prop="time">
                            <div class="block">
                                <el-date-picker
                                    v-model="form.time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="比赛地点" prop="position">
                            <el-input
                                v-model="form.position"
                                placeholder="比赛地点"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="报名截止时间" prop="registrationTime">
                            <div class="block">
                                <el-date-picker
                                    v-model="form.registrationTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="比赛描述">
                            <el-input
                                type="textarea"
                                v-model="form.description"
                                placeholder="比赛描述"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="团队报名">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.teamFlag"/>
                        </el-form-item>
                        <el-form-item label="最大团队报名数">
                            <el-slider
                                :disabled="form.teamFlag==0"
                                v-model="form.maxTeamNumber"
                                :max="1000"
                                show-input></el-slider>
                        </el-form-item>
                        <el-form-item label="个人报名">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.singleFlag"/>
                        </el-form-item>
                        <el-form-item label="最大个人报名数">
                            <el-slider
                                :disabled="form.singleFlag==0"
                                v-model="form.maxUserNumber"
                                :max="1000"
                                show-input></el-slider>
                        </el-form-item>
                        <el-form-item label="创建后可显示">
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
import {createCompetition, listCompetitionType} from "@/network/api/competition"

export default {
    name: "Create",
    data() {
        return {
            form: {
                name: '',
                description: '',
                time: '',
                startTime: '',
                endTime: '',
                registrationTime: '',
                position: '',
                typeId: '',
                teamFlag: 1,
                singleFlag: 1,
                registrationFlag: '',
                showFlag: 0,
                userId: this.$store.state.user.userId,
                userName: this.$store.state.user.name,
                maxTeamNumber: 100,
                maxUserNumber: 100
            },
            isLoading: false,
            buttonLoading: false,
            //比赛类型列表
            competitionTypeList: [],
            //截止时间快捷键
            pickerOptions: {
                shortcuts: [
                    {
                        text: '一天后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 1);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            rules: {
                name: [
                    {required: true, message: '请输入比赛名称', trigger: 'blur'},
                ],
                position: [
                    {required: true, message: '请输入比赛地点', trigger: 'blur'},
                ],
                time: [
                    {required: true, message: '请选择比赛起始时间', trigger: 'change'}
                ],
                registrationTime: [
                    {required: true, message: '请选择报名截止时间', trigger: 'change'}
                ],
                typeId: [
                    {required: true, message: '请选择比赛类型', trigger: 'change'}
                ],
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getCompetitionTypeList()
        },
        //获取比赛类型
        getCompetitionTypeList() {
            listCompetitionType().then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.competitionTypeList.push({value: res.data[i].id, label: res.data[i].name})
                }
            })
        },
        //创建比赛
        create() {
            this.buttonLoading = true;
            this.$refs.createCompetitionForm.validate(async (valid) => {
                if (!valid) {
                    this.buttonLoading = false;
                    return false;
                }
                this.form.startTime = this.form.time[0];
                this.form.endTime = this.form.time[1];
                if (this.form.registrationTime > this.form.startTime) {
                    this.buttonLoading = false;
                    return this.$message.error("报名截止时间晚于比赛开始时间");
                }
                const res = await createCompetition(this.form)
                if (res.code !== 200) {
                    this.buttonLoading = false;
                    return this.$message.error(res.message);
                }
                this.buttonLoading = false;
                await this.$router.push("/admin/competitionList")
            })
        },
        //去比赛列表
        toCompetitionList() {
            this.$router.push("/admin/competitionList")
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