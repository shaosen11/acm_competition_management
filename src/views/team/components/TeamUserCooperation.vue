<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>申请列表</span>
        </div>
        <el-table
            v-loading="listLoading"
            element-loading-text="努力加载中..."
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="name"
                label="用户名"
                width="140"
                align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="toUserInfo(scope.row.userId)">{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="130"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        round>同意
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import {getTeamUserCooperationListByTeamId} from '@/network/api/team'
export default {
    name: "TeamUserCooperation",
    props:{
        teamName:{
            type: String
        }
    },
    data(){
        return{
            //队伍查询条件
            teamUserCooperationQueryParam: {
                teamName: null,
                pageNum: 1,
                pageSize: 10,
            },
            //表单信息
            tableData: [],
            //是否正在加载
            listLoading: false,
        }
    },
    created() {
        this.getTeamUserCooperationList()
    },
    methods:{
        getTeamUserCooperationList(){
            this.teamUserCooperationQueryParam.teamName = this.teamName
            getTeamUserCooperationListByTeamId(this.teamUserCooperationQueryParam).then(res => {
                if (res.code != 200) {
                    return this.$message.success(res.message);
                }
                console.log(res.data.list)
                this.tableData = res.data.list;
            })
        },
        //跳转用户信息
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        },
    }
}
</script>

<style scoped>

</style>