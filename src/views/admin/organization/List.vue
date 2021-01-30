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
                <el-form :inline="true" :model="organizationQuery" size="small" label-width="100px">
                    <el-form-item label="选择年级：">
                        <el-select v-model="organizationQuery.year" placeholder="请选择">
                            <el-option
                                v-for="item in this.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="organizationQuery.name"
                                  placeholder="班级名称/关键字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <span>班级列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCreateOrganization">
                    <i class="el-icon-plus"></i>创建班级
                </el-button>
            </div>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                border
                style="width: 100%">
<!--                <el-table-column type="selection" width="60" align="center"></el-table-column>-->
                <el-table-column
                    prop="collegeName"
                    label="学院"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="year"
                    label="年级"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="organizationName"
                    label="班级名称"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <p>显示：
                            <el-switch
                                @change="handleVisitStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.visitFlag">
                            </el-switch>
                        </p>
                        <p>加入：
                            <el-switch
                                @change="handleJoinStatusChange(scope.row)"
                                :active-value="1"
                                :inactive-value="0"
                                v-model="scope.row.joinFlag">
                            </el-switch>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userCount"
                    label="当前人数"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="详情"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="toOrganizationInfo(scope.row)"
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
import {getOrganizationList, getOrganizationYearList, updateOrganization} from '@/network/api/organization';


const defaultOrganizationQuery = {
    year: '',
    name: '',
    pageNum: 1,
    pageSize: 5,
};

export default {
    name: "List",
    data() {
        return {
            //队伍查询条件
            organizationQuery: {
                year: '',
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
        this.init();
    },
    methods: {
        //初始化方法
        init() {
            this.getList();
            this.getYearList();
        },
        //获取班級信息
        getList() {
            this.listLoading = true;
            getOrganizationList(this.organizationQuery).then(res => {
                if (res.code !== 200) {
                    this.listLoading = false;
                    return this.$message.error(res.message);
                }
                console.log(res.data.list)
                this.tableData = res.data.list;
                this.total = res.data.total;
                this.totalPage = res.data.totalPage;
                this.organizationQuery.pageNum = res.data.pageNum;
                this.organizationQuery.pageSize = res.data.pageSize;
                if (this.total > this.organizationQuery.pageSize) {
                    this.isHide = false;
                }
                this.listLoading = false;
            })
        },
        //获取年级信息
        getYearList() {
            getOrganizationYearList().then(res => {
                if (res.code !== 200) {
                    this.$message.error(res.message);
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.options.push({value: res.data[i].year, label: res.data[i].year})
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
            this.$router.push({
                name: 'organizationInfo',
                query: {
                    year: organization.year,
                    name: organization.organizationName
                }
            })
        },
        toCreateOrganization() {
            this.$router.push("/admin/createOrganization")
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
        //处理是否显示
        handleVisitStatusChange(row) {
            const organization ={
                id: row.id,
                visitFlag: row.visitFlag,
            }
            updateOrganization(organization).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getList()
            })
        },
        //处理是否加入
        handleJoinStatusChange(row) {
            const organization ={
                id: row.id,
                joinFlag: row.joinFlag,
            }
            updateOrganization(organization).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getList()
            })
        },
    }
}
</script>

<style scoped>
.table-container, .pagination-container {
    margin: 15px auto;
}
</style>