<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                        style="float: right"
                        @click="handleSearchList()"
                        type="primary"
                        size="small">
                    查询结果
                </el-button>
                <el-button
                        style="float: right;margin-right: 15px"
                        @click="handleResetSearch()"
                        size="small">
                    重置
                </el-button>

            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="competitionQuery" size="small" label-width="100px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="competitionQuery.name"
                                  placeholder="比赛名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="比赛类型：">
                        <el-select v-model="competitionQuery.typeId" placeholder="请选择">
                            <el-option
                                    v-for="item in this.competitionTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示：">
                        <el-select v-model="competitionQuery.showFlag" placeholder="请选择">
                            <el-option
                                    v-for="item in this.showFlagList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>比赛列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateCompetition">
                    <i class="el-icon-plus"></i>创建比赛
                </el-button>
            </div>
            <el-table
                    v-loading="listLoading"
                    element-loading-text="努力加载中..."
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="competitionName"
                        label="名称"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="比赛时间"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <p>{{ scope.row.startTime }}</p>
                        <p>-</p>
                        <p>{{ scope.row.endTime }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="比赛类型"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="position"
                        label="比赛地点"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="registrationTime"
                        label="截止报名时间"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <p>团队报名：
                            <el-switch
                                    @change="handleTeamFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.teamFlag">
                            </el-switch>
                        </p>
                        <p>个人报名：
                            <el-switch
                                    @change="handlePersonFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.singleFlag">
                            </el-switch>
                        </p>
                        <p>截止报名：
                            <el-switch
                                    @change="handleRegistrationFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.registrationFlag">
                            </el-switch>
                        </p>
                        <p>是否展示：
                            <el-switch
                                    @change="handleShowFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.showFlag">
                            </el-switch>
                        </p>
                        <p>网络比赛：
                            <el-switch
                                    @change="handleOnlineStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.online">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="报名情况"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <p>团队报名数量：
                            {{scope.row.teamNumber}}
                        </p>
                        <p>个人报名数量：
                            {{scope.row.userNumber}}
                        </p>
                        <p>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="exportCompetitionUserRelation(scope.row.competitionId)"
                                round>导出报名数据
                            </el-button>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="比赛状态"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <p>
                            {{computeCompetitionStatus(scope.row)}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="toCompetitionUpdate(scope.row.competitionId)"
                                    round>修改信息
                            </el-button>
                        </p>
                        <p>
                            <el-button
                                    size="mini"
                                    @click="toCompetitionInfo(scope.row)"
                                    round>查看详情
                            </el-button>
                        </p>
                        <p>
                            <el-button
                                    size="mini"
                                    type="info"
                                    @click="cancelCompetitionDialogVisibleTrue(scope.row)"
                                    round>取消比赛
                            </el-button>
                        </p>
                        <p>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteCompetitionDialogVisibleTrue(scope.row)"
                                    round>删除比赛
                            </el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="competitionQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="competitionQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
        <!--取消比赛弹出框-->
        <el-dialog
                title="提示"
                :visible.sync="cancelCompetitionDialogVisible"
                width="30%"
                :before-close="cancelCompetitionHandleClose">
            <span>确认取消比赛？此操作将不可恢复</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCompetitionDialogVisible = false">取 消</el-button>
                <el-button
                        type="primary"
                        @click="cancelCompetition()"
                        :loading="cancelCompetitionDialogButtonLoading">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除比赛弹出框-->
        <el-dialog
                title="提示"
                :visible.sync="deleteCompetitionDialogVisible"
                width="30%"
                :before-close="deleteCompetitionHandleClose">
            <span>确认删除比赛？此操作将不可恢复</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteCompetitionDialogVisible = false">取 消</el-button>
                <el-button
                        type="primary"
                        @click="deleteCompetition()"
                        :loading="deleteCompetitionDialogButtonLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getCompetitionList,
        listCompetitionType,
        updateCompetition,
        deleteCompetition,
        exportCompetitionUserRelation
    } from '@/network/api/competition'

    const defaultCompetitionQuery = {
        typeId: '',
        name: '',
        showFlag: '',
        pageNum: 1,
        pageSize: 5,
    };

    export default {
        name: "List",
        data() {
            return {
                //比赛查询条件
                competitionQuery: {
                    typeId: '',
                    name: '',
                    showFlag: '',
                    pageNum: 1,
                    pageSize: 5,
                },
                //比赛类型
                competitionTypeList: [],
                //是否展示
                showFlagList: [
                    {
                        value: 1,
                        label: '展示',
                    },
                    {
                        value: 0,
                        label: '不展示',
                    }
                ],
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
                //取消比赛弹出框
                cancelCompetitionDialogVisible: false,
                //取消比赛弹按钮
                cancelCompetitionDialogButtonLoading: false,
                //取消比赛id
                cancelCompetitionId: '',
                //取消比赛弹出框
                deleteCompetitionDialogVisible: false,
                //取消比赛弹按钮
                deleteCompetitionDialogButtonLoading: false,
                //取消比赛id
                deleteCompetitionId: ''
            }

        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getList();
                this.getCompetitionTypeList();
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                getCompetitionList(this.competitionQuery).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.competitionQuery.pageNum = res.data.pageNum;
                    this.competitionQuery.pageSize = res.data.pageSize;
                    if (this.total > this.competitionQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
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
            //处理页面大小变化
            handleSizeChange(val) {
                this.competitionQuery.pageNum = 1;
                this.competitionQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.competitionQuery.pageNum = val;
                this.getList();
            },
            //跳转比赛信息
            toCompetitionInfo(competition) {
                this.$router.push({
                    name: 'competitionInfo',
                    query: {
                        competitionId: competition.competitionId
                    }
                })
            },
            //跳转比赛信息
            toCompetitionUpdate(competitionId) {
                this.$router.push({
                    name: 'competitionUpdate',
                    query: {
                        competitionId: competitionId
                    }
                })
            },
            //去创建比赛页面
            toCreateCompetition() {
                this.$router.push("/admin/createCompetition")
            },
            //点击搜索按钮
            handleSearchList() {
                this.competitionQuery.pageNum = 1;
                this.getList();
            },
            //点击重置按钮
            handleResetSearch() {
                this.competitionQuery = Object.assign({}, defaultCompetitionQuery);
            },
            //处理是否团队报名
            handleTeamFlagStatusChange(row) {
                const competition = {
                    id: row.id,
                    teamFlag: row.teamFlag
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //处理是否个人报名
            handlePersonFlagStatusChange(row) {
                const competition = {
                    id: row.id,
                    singleFlag: row.singleFlag
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //处理是否截止报名
            handleRegistrationFlagStatusChange(row) {
                const competition = {
                    id: row.id,
                    registrationFlag: row.registrationFlag
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const competition = {
                    id: row.id,
                    showFlag: row.showFlag
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //处理是否网络比赛
            handleOnlineStatusChange(row) {
                const competition = {
                    id: row.id,
                    online: row.online
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //取消比赛
            cancelCompetitionDialogVisibleTrue(row) {
                this.cancelCompetitionId = row.id
                this.cancelCompetitionDialogVisible = true;
            },
            //确认取消比赛
            cancelCompetitionHandleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            cancelCompetition() {
                this.cancelCompetitionDialogButtonLoading = true
                const competition = {
                    id: this.cancelCompetitionId,
                    cancelFlag: 0
                }
                updateCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        this.cancelCompetitionDialogButtonLoading = false;
                        this.cancelCompetitionDialogVisible = false;
                        return this.$message.error(res.message);
                    }
                    this.cancelCompetitionDialogButtonLoading = false;
                    this.cancelCompetitionDialogVisible = false;
                    this.getList()
                })
            },
            //删除比赛
            deleteCompetitionDialogVisibleTrue(row) {
                this.deleteCompetitionId = row.id
                this.deleteCompetitionDialogVisible = true;
            },
            //确认删除比赛
            deleteCompetitionHandleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            deleteCompetition() {
                this.deleteCompetitionDialogButtonLoading = true
                const competition = {
                    id: this.deleteCompetitionId,
                    deleteFlag: 0
                }
                deleteCompetition(competition).then(res => {
                    if (res.code !== 200) {
                        this.deleteCompetitionDialogButtonLoading = false;
                        this.deleteCompetitionDialogVisible = false;
                        return this.$message.error(res.message);
                    }
                    this.deleteCompetitionDialogButtonLoading = false;
                    this.deleteCompetitionDialogVisible = false;
                    this.getList()
                })
            },
            //展示比赛状态
            computeCompetitionStatus(row) {
                let date = new Date();
                let startTime = new Date(Date.parse(row.startTime));
                let endTime = new Date(Date.parse(row.endTime));
                let registrationTime = new Date(Date.parse(row.registrationTime));
                if (row.cancelFlag === 0) {
                    return "比赛取消"
                }
                if (row.registrationFlag === 1) {
                    return "主动截止报名";
                }
                if (date < registrationTime) {
                    return "正在报名比赛"
                }
                if (date >= registrationTime && date <= startTime) {
                    return "比赛报名截止"
                }
                if (date >= startTime && date <= endTime) {
                    return "比赛开始"
                }
                if (date > endTime) {
                    return "比赛截止"
                }
            },
            //导出报名数据
            exportCompetitionUserRelation(competitionId){
                exportCompetitionUserRelation(competitionId).then(res => {
                    const content = res
                    const blob = new Blob([content])
                    const fileName = '报名信息.xls'
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 30px auto;
    }
</style>