<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>班级</el-breadcrumb-item>
            <el-breadcrumb-item>班级列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="never" style="margin-top: 30px">
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
                <el-form :inline="true" :model="organizationQuery" size="small" label-width="140px">
                    <el-form-item label="选择年级：">
                        <el-select v-model="organizationQuery.year" placeholder="请选择">
                            <el-option
                                v-for="item in organizationQuery.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="organizationQuery.name" placeholder="班级名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>班级列表</span>
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="collegeName"
                    label="学院"
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="year"
                    label="年级"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="organizationName"
                    label="班级名称"
                    width="250"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="userCount"
                    label="当前人数"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作"
                    width="270"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="toOrganizationInfo(scope.row)"
                            round>查看详情
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="applyJoinOrganization(scope.row.organizationId)"
                            :disabled="scope.row.joinFlag == 1"
                            round>申请加入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container" style="float: right;">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="organizationQuery.pageNum"
                    :page-sizes="[5,10,15]"
                    :page-size="organizationQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :hide-on-single-page="isHide">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import {getOrganizationList, getOrganizationYearList, applyJoinOrganization} from '@/network/api/organization';

const defaultOrganizationQuery = {
    year: '',
    name: '',
    pageNum: 1,
    pageSize: 10,
};

export default {
    name: "List",
    data() {
        return{
            //队伍查询条件
            organizationQuery: {
                year: '',
                name: '',
                visitFlag: 1,
                pageNum: 1,
                pageSize: 10,
                options: []
            },
            OrganizationUserCooperationQuery:{
                pageNum: 1,
                pageSize: 10,
            },
            //表单信息
            tableData: [],
            //表单总数
            total: null,
            //是否正在加载
            listLoading: false,
            //是否分页隐藏
            isHide: true,
        }

    },
    created() {
        this.init();
    },
    methods: {
        //初始化方法
        init() {
            this.getList();
            this.getYearList();
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            getOrganizationList(this.organizationQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.organizationQuery.pageNum = res.data.pageNum;
                this.organizationQuery.pageSize = res.data.pageSize;
                if (this.total > this.organizationQuery.pageSize) {
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //获取年级信息
        getYearList(){
            getOrganizationYearList().then(res => {
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.organizationQuery.options.push({value: res.data[i].year, label: res.data[i].year})
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
        //跳转班级信息
        toOrganizationInfo(organization) {
            this.$router.push({name: 'organizationInfo',
                query: {
                    year: organization.year,
                    name: organization.organizationName
                }
            })
        },
        //点击搜索按钮
        handleSearchList() {
            this.organizationQuery.pageNum = 1;
            this.getList();
        },
        //点击重置按钮
        handleResetSearch() {
            this.organizationQuery = Object.assign({}, defaultOrganizationQuery);
        },
        //申请加入班级
        applyJoinOrganization(organizationId){
            if (this.$store.state.user.userId==''){
                this.$message.error("请先登录");
                return false;
            }
            const organizationUserCooperation = {
                organizationId: organizationId,
                userId: this.$store.state.user.userId,
            }
            applyJoinOrganization(organizationUserCooperation).then(res =>{
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                return this.$message.success(res.message);
            })
        },
    }
}
</script>

<style scoped>
.table-container, .pagination-container {
    margin: 30px auto;
}
</style>