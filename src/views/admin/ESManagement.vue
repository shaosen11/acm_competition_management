<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>
                    Es索引管理
                </b>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <p>博客索引管理</p>
                    <el-button type="primary" @click="importEsBlogAll">导入博客索引</el-button>
                    <el-button type="danger" @click="deleteEsBlogIndex">删除博客索引</el-button>
                </el-col>
                <el-col :span="12">
                    <p>报告索引管理</p>
                    <el-button type="primary" @click="importEsReportAll">导入报告索引</el-button>
                    <el-button type="danger" @click="deleteEsReportIndex">删除报告索引</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {deleteEsBlogIndex, importEsBlogAll, deleteEsReportIndex, importEsReportAll} from "@/network/api/es";

    export default {
        name: "ESManagement",
        methods: {
            deleteEsBlogIndex(){
                deleteEsBlogIndex().then(res => {
                    this.dealResult(res)
                })
            },
            importEsBlogAll(){
                importEsBlogAll().then(res => {
                    this.dealResult(res)
                })
            },
            deleteEsReportIndex(){
                deleteEsReportIndex().then(res => {
                    this.dealResult(res)
                })
            },
            importEsReportAll(){
                importEsReportAll().then(res => {
                    this.dealResult(res)
                })
            },
            dealResult(res){
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                return this.$message.success(res.message);
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>