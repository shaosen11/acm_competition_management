<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="iconfont el-icon-third-search"></i>
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
                <el-form :inline="true" :model="competitionProblemTypeQuery" size="small" label-width="100px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="competitionProblemTypeQuery.name"
                                  placeholder="题型名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="父类型：">
                        <el-select v-model="competitionProblemTypeQuery.parentId" placeholder="请选择">
                            <el-option
                                    v-for="item in this.competitionProblemTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示：">
                        <el-select v-model="competitionProblemTypeQuery.showFlag" placeholder="请选择">
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
                <span>比赛题型</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateCompetitionProblemType">
                    <i class="el-icon-plus"></i>创建比赛题型
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
                        prop="name"
                        label="比赛类型"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="parentName"
                        label="父类"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="degree"
                        label="热度"
                        width="150"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="150"
                        align="center">
                    <template slot-scope="scope">
                        <p>显示：
                            <el-switch
                                    @change="handleShowFlagStatusChange(scope.row)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="scope.row.showFlag">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="详情"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                round>查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="competitionProblemTypeQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="competitionProblemTypeQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        updateCompetitionProblemType,
        listCompetitionProblemTypeByPage,
        listCompetitionProblemType
    } from '@/network/api/competition';

    const defaultCompetitionProblemTypeQuery = {
        name: '',
        showFlag: '',
        parentId: '',
        pageNum: 1,
        pageSize: 5,
    };


    export default {
        name: "CompetitionProblemType",
        data() {
            return {
                //队伍查询条件
                competitionProblemTypeQuery: {
                    name: '',
                    showFlag: '',
                    parentId: '',
                    pageNum: 1,
                    pageSize: 5,
                },
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
                //比赛题型
                competitionProblemTypeList: [],
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
            }

        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getList();
                this.getCompetitionProblemTypeList();
            },
            //获取比赛类型信息
            getList() {
                this.listLoading = true;
                listCompetitionProblemTypeByPage(this.competitionProblemTypeQuery).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.totalPage = res.data.totalPage;
                    this.competitionProblemTypeQuery.pageNum = res.data.pageNum;
                    this.competitionProblemTypeQuery.pageSize = res.data.pageSize;
                    if (this.total > this.competitionProblemTypeQuery.pageSize) {
                        this.isHide = false;
                    }
                    this.listLoading = false;
                })
            },
            //获取比赛类型
            getCompetitionProblemTypeList() {
                const competitionProblemType = {
                    parentId: 0,
                }
                listCompetitionProblemType(competitionProblemType).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.competitionProblemTypeList.push({value: res.data[i].id, label: res.data[i].name})
                    }
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.competitionProblemTypeQuery.pageNum = 1;
                this.competitionProblemTypeQuery.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.competitionProblemTypeQuery.pageNum = val;
                this.getList();
            },
            //处理是否展示
            handleShowFlagStatusChange(row) {
                const competitionProblemType = {
                    id: row.id,
                    showFlag: row.showFlag
                }
                updateCompetitionProblemType(competitionProblemType).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.getList()
                })
            },
            //创建比赛类型
            toCreateCompetitionProblemType() {
                this.$router.push("/admin/createCompetitionProblemType")
            },
            //点击搜索按钮
            handleSearchList() {
                this.competitionProblemTypeQuery.pageNum = 1;
                this.getList();
            },
            //点击重置按钮
            handleResetSearch() {
                this.competitionProblemTypeQuery = Object.assign({}, defaultCompetitionProblemTypeQuery);
            },
        }
    }
</script>

<style scoped>
    .table-container, .pagination-container {
        margin: 15px auto;
    }
</style>