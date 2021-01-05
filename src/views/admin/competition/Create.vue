<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>创建比赛</span>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                        ref="createCompetitionForm"
                        v-loading="isLoading"
                        :model="form"
                        label-width="100px">
                        <el-form-item label="比赛名次">
                            <el-input
                                v-model="form.name"
                                placeholder="比赛名称"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛描述">
                            <el-input
                                v-model="form.describe"
                                placeholder="比赛描述"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="比赛时间">
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
                        <el-form-item label="比赛地点">
                                <el-input
                                    v-model="form.position"
                                    placeholder="比赛地点"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="报名截止时间">
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
                        <el-form-item label="团队报名">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.teamFlag"/>
                        </el-form-item>
                        <el-form-item label="个人报名">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="form.personFlag"/>
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
import {createCompetition} from "@/network/api/competition"

export default {
    name: "Create",
    data() {
        return {
            form: {
                name:'',
                description: '',
                time: '',
                startTime: '',
                endTime: '',
                registrationTime: '',
                position: '',
                typeId: '',
                teamFlag: 1,
                personFlag: 1,
                registrationFlag: '',
                showFlag: 0,
                userId: this.$store.state.user.userId,
                userName: this.$store.state.user.name
            },
            isLoading: false,
            buttonLoading: false,
            //截止时间快捷键
            pickerOptions: {
                shortcuts: [{
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
        },
        create() {
            this.form.startTime = this.form.time[0]
            this.form.endTime = this.form.time[1]
            console.log(this.form)
            createCompetition(this  .form).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
            })
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