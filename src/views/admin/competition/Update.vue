<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <b>比赛设置</b>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form ref="updateCompetitionForm"
                             v-loading="isLoading"
                             :model="form"
                             :rules="rules"
                             label-width="120px">
                        <el-form-item label="比赛名称" prop="competitionName">
                            <el-input
                                v-model="form.competitionName"
                                placeholder="比赛名称"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛类型" prop="typeId">
                            <el-select
                                v-model="form.typeName"
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
                            <el-date-picker
                                v-model="form.time"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="比赛地点" prop="position">
                            <el-input v-model="form.position"></el-input>
                        </el-form-item>
                        <el-form-item label="截止报名">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.registrationFlag"/>
                        </el-form-item>
                        <el-form-item label="报名截止时间" prop="registrationTime">
                            <div class="block">
                                <el-date-picker
                                    :disabled="form.registrationFlag==1"
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
                                placeholder="比赛描述"></el-input>
                        </el-form-item>
                        <el-form-item label="网络比赛">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.online"/>
                        </el-form-item>
                        <el-form-item label="报名方式">
                            <el-checkbox v-model="form.singleFlag" :true-label=1 :false-label=0 border>个人报名
                            </el-checkbox>
                            <el-checkbox v-model="form.teamFlag" :true-label=1 :false-label=0 border>团队报名
                            </el-checkbox>
                        </el-form-item>
                        <el-form-item label="最大个人报名数">
                            <el-slider
                                :disabled="form.singleFlag==0"
                                v-model="form.maxUserNumber"
                                :max="1000"
                                show-input></el-slider>
                        </el-form-item>
                        <el-form-item label="最大团队报名数">
                            <el-slider
                                :disabled="form.teamFlag==0"
                                v-model="form.maxTeamNumber"
                                :max="1000"
                                show-input></el-slider>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="updateCompetitionInfo"
                                :loading="this.buttonLoading"
                                round>修改
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
    getCompetitionByCompetitionId, listCompetitionType, updateCompetition
} from '@/network/api/competition'

export default {
    name: "Update",
    data() {
        return {
            //修改用户信息按钮加载
            updateUserInfoButtonLoading: false,
            //比赛类型列表
            competitionTypeList: [],
            //表单正在加载
            isLoading: false,
            //修改按钮正在加载
            buttonLoading: false,
            //比赛信息
            form: {
                id: '',
                competitionId: '',
                name: '',
                competitionName: '',
                description: '',
                time: ['', ''],
                startTime: '',
                endTime: '',
                registrationTime: '',
                registrationFlag: '',
                position: '',
                teamFlag: '',
                teamName: '',
                personFlag: '',
                showFlag: '',
                userId: '',
                userName: '',
            },
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
                competitionName: [
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
        this.isLoading = true;
        this.init()
        this.isLoading = false;
    },
    methods: {
        init() {
            this.getCompetitionByCompetitionId(this.$route.query.competitionId)
            this.getCompetitionTypeList()
        },
        getCompetitionByCompetitionId(competitionId) {
            const competition = {
                competitionId
            }
            getCompetitionByCompetitionId(competition).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.form = res.data
                this.form.time = [this.form.startTime, this.form.endTime]
            })
        },
        //获取比赛类型
        getCompetitionTypeList() {
            const competitionType = {
                showFlag: 1,
            }
            listCompetitionType(competitionType).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.competitionTypeList.push({value: res.data[i].id, label: res.data[i].name})
                }
            })
        },
        //修改比赛信息
        updateCompetitionInfo() {
            this.buttonLoading = true;
            this.$refs.updateCompetitionForm.validate(async (valid) => {
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
                this.form.name = this.form.competitionName
                const res = await updateCompetition(this.form)
                if (res.code !== 200) {
                    this.buttonLoading = false;
                    return this.$message.error(res.message);
                }
                this.buttonLoading = false;
                await this.toCompetitionInfo()
            })
        },
        //跳转比赛信息
        toCompetitionInfo() {
            this.$router.push({
                name: 'competitionInfo',
                query: {
                    competitionId : this.$route.query.competitionId
                }
            })
        },
    }
}
</script>

<style scoped>
.table-container {
    width: 1000px;
}
</style>