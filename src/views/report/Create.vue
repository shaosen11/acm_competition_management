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
                <el-button type="info" @click="save">保存</el-button>
                <el-button type="primary" @click="release">发布</el-button>
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
                        <el-form-item label="名称" prop="problemName">
                            <el-input
                                    v-model="report.problemName"
                                    placeholder="请输入题目名称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="OJ" prop="ojId">
                            <el-select
                                    v-model="report.ojId"
                                    placeholder="请选择">
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
                                        clearable
                                        placeholder="试试搜索：STL"
                                        :options="competitionProblemTypeList"
                                        filterable></el-cascader>
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
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="problemDescribeChange"
                            style="min-height: 550px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 2">
                    <h3>输入描述</h3>
                    <mavon-editor
                            v-model="report.inputMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="inputChange"
                            style="min-height: 300px; margin-top: 10px"/>
                    <h3>输出描述</h3>
                    <mavon-editor
                            v-model="report.outputMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="outputChange"
                            style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 3">
                    <h3>输入案例</h3>
                    <mavon-editor
                            v-model="report.inputExamplesMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="inputExamplesChange"
                            style="min-height: 300px; margin-top: 10px"/>
                    <h3>输出案列</h3>
                    <mavon-editor
                            v-model="report.outputExamplesMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="outputExamplesChange"
                            style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 4">
                    <h3>分析</h3>
                    <mavon-editor
                            v-model="report.analysisMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="analysisChange"
                            style="min-height: 300px; margin-top: 10px"/>
                    <h3>代码</h3>
                    <mavon-editor
                            v-model="report.programMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="programChange"
                            style="min-height: 300px; margin-top: 10px"/>
                </div>
                <div v-if="this.status == 5">
                    <h3>自测样例</h3>
                    <mavon-editor
                            v-model="report.testExamplesMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="testExamplesChange"
                            style="min-height: 300px; margin-top: 10px"/>
                    <h3>AC截图</h3>
                    <mavon-editor
                            v-model="report.resultPictureMd"
                            ref="md"
                            @imgAdd="$imgAdd"
                            @change="resultPictureChange"
                            style="min-height: 300px; margin-top: 10px"/>
                    <h3>结果备注</h3>
                    <mavon-editor
                            v-model="report.resultCommentMd"
                            ref="md"
                            @imgAdd="$imgAdd"
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
                oldReport: ''
            };
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.tipNotify()
                this.listOnlineJudgeSystem()
                this.listCompetitionProblemTypeWithChildren()
                this.getReportByReportId(this.$route.query.reportId)
            },
            tipNotify() {
                this.$message.info("当点击上一步或下一步时，会自动保存内容")
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
            //根据reportId获取报告
            getReportByReportId(reportId) {
                //如果第一次进入有reportId，就根据reportId获取
                //如果没有reportId，则代表是新报告
                if (reportId != null) {
                    getReportByReportId(reportId).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.report = res.data
                    })
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
                let report = JSON.stringify(this.report);
                let oldReport = JSON.stringify(this.oldReport)
                if (report == oldReport) {
                    return;
                }
                if (this.report.problemTypeId != null && this.report.problemTypeId.length > 0) {
                    this.report.problemTypeId = this.report.problemTypeId[1]
                }
                this.report.userId = this.$store.state.user.userId
                saveReport(this.report).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.report = res.data
                    //拷贝对象
                    this.oldReport = JSON.parse(JSON.stringify(res.data))
                    if (this.report.reportId != null) {
                        if (this.$route.query.reportId == null) {
                            this.toCreate(this.report.reportId)
                        }
                    }
                })
            },
            release() {
                if (this.report.problemTypeId != null && this.report.problemTypeId.length > 0) {
                    this.report.problemTypeId = this.report.problemTypeId[1]
                }
                this.report.userId = this.$store.state.user.userId
                releaseReport(this.report).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    console.log("去报告列表")

                })
            },
            //保存之后重新进入页面
            toCreate(reportId) {
                this.$router.push({
                    name: 'reportCreate',
                    query: {reportId}
                })
            },
            toReportInfo(reportId) {
                this.$router.push({
                    name: 'reportInfo',
                    query: {reportId}
                })
            },

            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file) {
                var formdata = new FormData();
                formdata.append("file", $file);
                //将下面上传接口替换为你自己的服务器接口
                axios({
                    url: "/common/upload",
                    method: "post",
                    data: formdata,
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(url => {
                    this.$refs.md.$img2Url(pos, url);
                });
            },
        }
    }
</script>

<style scoped>
</style>