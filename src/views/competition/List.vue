<template>
    <div>
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
                <el-button
                    style="float: right"
                    type="primary"
                    size="small">
                    查询结果
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    size="small">
                    重置
                </el-button>

            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="competitionQuery" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="competitionQuery.name"
                                  placeholder="比赛名称/关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="比赛类型：">
                        <el-select v-model="competitionQuery.userCount" placeholder="请选择">
                            <el-option
                                v-for="item in competitionQuery.options"
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
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="比赛名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="比赛时间">
                                <span>{{ props.row.startTime }} - {{ props.row.endTime }}</span>
                            </el-form-item>
                            <el-form-item label="比赛地点">
                                <span>{{ props.row.position }}</span>
                            </el-form-item>
                            <el-form-item label="比赛描述">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="比赛类型">
                                <span>{{ props.row.typeId }}</span>
                            </el-form-item>
                            <el-form-item label="报名截止时间">
                                <span>{{ props.row.registrationTime }}</span>
                            </el-form-item>
                            <el-form-item label="团队报名人数">
                                <span>{{ props.row.teamNumber }}</span>
                            </el-form-item>
                            <el-form-item label="个人报名人数">
                                <span>{{ props.row.singleNumber }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="比赛名称"
                    prop="name"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-trophy"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="比赛时间"
                    prop="time"
                    width="400"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="比赛地点"
                    prop="position"
                    width="250"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-location-information"></i>
                        <span style="margin-left: 10px">{{ scope.row.position }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="比赛详情"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            round>报名
                        </el-button>
                        <el-button
                            size="mini"
                            @click="toCompetitionInfo(scope.row)"
                            round>详情
                        </el-button>
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
    </div>
</template>

<script>
import {getCompetitionList} from '@/network/api/competition'

export default {
    name: "competition",
    data() {
        return {
            //队伍查询条件
            competitionQuery: {
                name: '',
                pageNum: 1,
                pageSize: 5,
            },
            options: [],
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
            value: true
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getList()
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            getCompetitionList(this.competitionQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                console.log(res.data.list)
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
        //跳转比赛信息
        toCompetitionInfo(competition) {
            this.$router.push({
                name: 'competitionInfo',
                query: {
                    competitionId: competition.competitionId
                }
            })
        },
        //处理页面大小变化
        handleSizeChange(val) {
            this.organizationQuery.pageNum = 1;
            this.organizationQuery.pageSize = val;
            this.getList();
        },
        //处理当前页面数量变化
        handleCurrentChange(val) {
            this.organizationQuery.pageNum = val;
            this.getList();
        },
    }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.table-container, .pagination-container {
    margin: 30px auto;
}
</style>