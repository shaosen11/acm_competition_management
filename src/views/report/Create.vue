<template>
    <div class="big-app-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>解题报告</el-breadcrumb-item>
            <el-breadcrumb-item>创建报告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px">
            <el-col :span="16">
                <el-input v-model="report.name" placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="save" :loading="saveButtonLoading">保存</el-button>
                <el-button type="primary" @click="release" :loading="releaseButtonLoading">发布</el-button>
            </el-col>
        </el-row>
        <el-tooltip class="item" effect="dark" content="点击相应步骤可跳转" placement="top">
            <el-steps :active="status" align-center style="margin-top: 30px">
                <el-step title="题目信息" description="填写题目信息和输入输出" @click.native="toOne"></el-step>
                <el-step title="输入输出描述" description="Copy题目的输入输描述" @click.native="toTwo"></el-step>
                <el-step title="输入输出案例" description="Copy题目的输入输案例" @click.native="toThree"></el-step>
                <el-step title="解题分析" description="描述你如何轻松解题这道题" @click.native="toFour"></el-step>
                <el-step title="题目备注" description="可添加AC图片和题目备注" @click.native="toFive"></el-step>
            </el-steps>
        </el-tooltip>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
                <el-card class="box-card" style="margin-top: 20px">
                    <div slot="header">
                        <span>题目信息</span>
                    </div>
                    <el-form ref="registerForm" :model="report" label-width="50px">
                        <el-form-item label="原文" prop="link">
                            <el-input
                                v-model="report.link"
                                placeholder="可输入原文地址"
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item label="题目" prop="problemName">
                            <el-input
                                v-model="report.problemName"
                                placeholder="请输入题目名称"
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item label="OJ" prop="ojId">
                            <el-select
                                v-model="report.ojId"
                                placeholder="请选择"
                                clearable>
                                <el-option
                                    v-for="item in this.OJList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="网址" prop="problemLink">
                            <el-input
                                v-model="report.problemLink"
                                placeholder="请输传送门"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="题型" prop="ojId">
                            <div class="block">
                                <el-cascader
                                    v-model="report.problemTypeId"
                                    placeholder="试试搜索：STL"
                                    :options="competitionProblemTypeList"
                                    filterable
                                    clearable></el-cascader>
                            </div>
                        </el-form-item>
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-button
                                v-if="this.status>1"
                                type="primary"
                                @click="lastStep"
                                round>上一步
                            </el-button>
                            <el-button
                                v-if="this.status<5"
                                type="primary"
                                @click="nextStep"
                                round>下一步
                            </el-button>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="18">
                <div v-if="this.status == 1">
                    <h3>题目描述</h3>
                    <mavon-editor
                        v-model="report.problemDescribeMd"
                        ref="problemDescribeMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd"
                        @change="problemDescribeChange"
                        style="min-height: 550px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 2">
                    <h3>输入描述</h3>
                    <mavon-editor
                        v-model="report.inputMd"
                        ref="inputMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd1"
                        @change="inputChange"
                        style="min-height: 300px; margin-top: 10px"/>
                    <h3>输出描述</h3>
                    <mavon-editor
                        v-model="report.outputMd"
                        ref="outputMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd2"
                        @change="outputChange"
                        style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 3">
                    <h3>输入案例</h3>
                    <mavon-editor
                        v-model="report.inputExamplesMd"
                        ref="inputExamplesMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd3"
                        @change="inputExamplesChange"
                        style="min-height: 300px; margin-top: 10px"/>
                    <h3>输出案列</h3>
                    <mavon-editor
                        v-model="report.outputExamplesMd"
                        ref="outputExamplesMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd4"
                        @change="outputExamplesChange"
                        style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 4">
                    <h3>分析</h3>
                    <mavon-editor
                        v-model="report.analysisMd"
                        ref="analysisMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd5"
                        @change="analysisChange"
                        style="min-height: 300px; margin-top: 10px"/>
                    <h3>代码</h3>
                    <mavon-editor
                        v-model="report.programMd"
                        ref="programMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd6"
                        @change="programChange"
                        style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 5">
                    <h3>自测样例</h3>
                    <mavon-editor
                        v-model="report.testExamplesMd"
                        ref="testExamplesMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd7"
                        @change="testExamplesChange"
                        style="min-height: 300px; margin-top: 10px"/>
                    <h3>AC截图</h3>
                    <mavon-editor
                        v-model="report.resultPictureMd"
                        ref="resultPictureMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd8"
                        @change="resultPictureChange"
                        style="min-height: 300px; margin-top: 10px"/>
                    <h3>结果备注</h3>
                    <mavon-editor
                        v-model="report.resultCommentMd"
                        ref="resultCommentMd"
                        @imgDel="$imgDel"
                        @imgAdd="$imgAdd9"
                        @change="resultCommentChange"
                        style="min-height: 300px; margin-top: 10px"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {listOnlineJudgeSystem, saveReport, getReportByReportId, releaseReport} from '@/network/api/report'
import {listCompetitionProblemTypeWithChildren} from '@/network/api/competition'
import {deleteImage, upload} from '@/network/api/minio'

export default {
    name: "Create",
    data() {
        return {
            status: 1,
            report: {
                userId: '',
                reportId: '',
                name: '',
                problemName: '',
                ojId: '',
                problemLink: '',
                problemTypeId: '',
                problemDescribe: '',
                problemDescribeMd: '',
                input: '',
                inputMd: '',
                output: '',
                outputMd: '',
                inputExamples: '',
                inputExamplesMd: '',
                outputExamples: '',
                outputExamplesMd: '',
                analysis: '',
                analysisMd: '',
                program: '',
                programMd: '',
                testExamples: '',
                testExamplesMd: '',
                resultPicture: '',
                resultPictureMd: '',
                resultComment: '',
                resultCommentMd: '',
            },
            OJList: [],
            competitionProblemTypeList: [],
            oldReport: '',
            saveButtonLoading: false,
            releaseButtonLoading: false,
        };
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getReportByReportId(this.$route.query.reportId)
        },
        tipNotify() {
            this.$message.info("当点击上一步或下一步时，会自动保存内容");
            const h = this.$createElement;
            this.$notify.info({
                title: '操作提示',
                message: h('i', {style: 'color: teal'}, '当点击保存之后，等待系统重新跳转至本页面，请勿重新点击'),
                offset: 50,
                duration: 3000
            });
            this.$notify.info({
                title: '操作提示',
                message: h('i', {style: 'color: teal'}, '保存是保存为草稿，还不可见，只有发布经过审核才可见，发布之后点击保存会自动发布'),
                offset: 150,
                duration: 5000
            });
        },
        initCheck(userId) {
            if (this.$store.state.user.userId != userId) {
                this.$message.error("请用发布账号登录");
                this.$router.push('/home')
            }
            this.afterInit()
        },
        afterInit() {
            this.tipNotify()
            this.listOnlineJudgeSystem()
            this.listCompetitionProblemTypeWithChildren()
        },
        getReportByReportId(reportId) {
            if (reportId != null) {
                getReportByReportId(reportId).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.report = res.data
                    this.initCheck(this.report.userId)
                })
            } else {
                this.afterInit()
            }
        },
        //获取OJ系统
        listOnlineJudgeSystem() {
            const onlineJudge = {
                showFlag: 1
            };
            listOnlineJudgeSystem(onlineJudge).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.OJList.push({value: res.data[i].id, label: res.data[i].name})
                }
            })
        },
        //获取比赛题型
        listCompetitionProblemTypeWithChildren() {
            const competitionProblemType = {
                parentId: 0,
                showFlag: 1
            }
            listCompetitionProblemTypeWithChildren(competitionProblemType).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.competitionProblemTypeList = res.data
            })
        },
        lastStep() {
            this.save()
            if (this.status >= 2) {
                this.status--
            }
        },
        nextStep() {
            this.save()
            if (this.status <= 4) {
                this.status++
            }
        },
        toOne() {
            this.save()
            this.status = 1
        },
        toTwo() {
            this.save()
            this.status = 2
        },
        toThree() {
            this.save()
            this.status = 3
        },
        toFour() {
            this.save()
            this.status = 4
        },
        toFive() {
            this.save()
            this.status = 5
        },
        save() {
            this.saveButtonLoading = true
            let report = JSON.stringify(this.report);
            let oldReport = JSON.stringify(this.oldReport)
            if (report == oldReport) {
                this.saveButtonLoading = false
                return;
            }
            if (this.report.problemTypeId != null && this.report.problemTypeId.length > 0) {
                this.report.problemTypeId = this.report.problemTypeId[1]
            }
            this.report.userId = this.$store.state.user.userId
            saveReport(this.report).then(res => {
                if (res.code != 200) {
                    this.saveButtonLoading = false
                    return this.$message.error(res.message);
                }
                this.report = res.data;
                this.$message.success("保存成功");
                //拷贝对象
                this.oldReport = JSON.parse(JSON.stringify(res.data))
                if (this.report.reportId != null) {
                    if (this.$route.query.reportId == null) {
                        this.saveButtonLoading = false
                        this.toCreate(this.report.reportId)
                    }
                }
            })
            this.saveButtonLoading = false
        },
        release() {
            this.releaseButtonLoading = true
            if (this.report.problemTypeId != null && this.report.problemTypeId.length > 0) {
                this.report.problemTypeId = this.report.problemTypeId[1]
            }
            this.report.userId = this.$store.state.user.userId
            releaseReport(this.report).then(res => {
                if (res.code != 200) {
                    this.releaseButtonLoading = false
                    return this.$message.error(res.message);
                }
                this.releaseButtonLoading = false
                this.$router.push('/reportList')
            })
            this.releaseButtonLoading = false
        },
        //保存之后重新进入页面
        toCreate(reportId) {
            this.$router.push({
                name: 'reportCreate',
                query: {reportId}
            })
        },
        toReport(reportId) {
            this.$router.push({
                name: 'reportInfo',
                query: {reportId}
            })
        },
        problemDescribeChange(value, render) {
            this.report.problemDescribe = render;
        },
        inputChange(value, render) {
            this.report.input = render;
        },
        outputChange(value, render) {
            this.report.output = render;
        },
        inputExamplesChange(value, render) {
            this.report.inputExamples = render;
        },
        outputExamplesChange(value, render) {
            this.report.outputExamples = render;
        },
        analysisChange(value, render) {
            this.report.analysis = render;
        },
        programChange(value, render) {
            this.report.program = render;
        },
        testExamplesChange(value, render) {
            this.report.testExamples = render;
        },
        resultPictureChange(value, render) {
            this.report.resultPicture = render;
        },
        resultCommentChange(value, render) {
            this.report.resultComment = render;
        },
        $imgDel(pos) {
            deleteImage(pos[0]).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
            })
        },
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.problemDescribeMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd1(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.inputMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd2(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.outputMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd3(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.inputExamplesMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd4(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.outputExamplesMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd5(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.analysisMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd6(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.programMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd7(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.testExamplesMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd8(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.resultPictureMd.$img2Url(pos, res.data.url);
            })
        },
        $imgAdd9(pos, $file) {
            var formdata = new FormData();
            formdata.append("file", $file);
            upload(formdata).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                return this.$refs.resultCommentMd.$img2Url(pos, res.data.url);
            })
        },
    }
}
</script>

<style scoped>
</style>