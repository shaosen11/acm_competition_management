<template>
    <div>
        <el-form ref="form" :model="team" label-width="80px">
            <el-row :gutter="20">
                <!--个人信息-->
                <el-col :span="16">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>队伍信息</span>
                            <el-button style="float: right; padding: 3px 0"
                                       type="text"
                                       @click="toUpdateTeamInfo">修改
                            </el-button>
                        </div>

                        <!--个人信息-->
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-col :span="20">
                                <el-form-item label="名称">
                                    <span>{{this.team.name}}</span>
                                </el-form-item>
                                <el-form-item label="队长">
                                    <span>{{this.team.userName}}</span>
                                </el-form-item>
                                <el-form-item label="座右铭">
                                    <span>{{this.team.motto}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <!--队伍信息-->
                        <el-row type="flex" justify="center">
                            <el-col :span="20">
                                <el-divider>队员信息</el-divider>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <team-info ref="teamInfo" :users="this.users"/>
                        </el-row>
                    </el-card>
                </el-col>

            </el-row>
        </el-form>
        <update ref="update"
                :dialogFormVisible="dialogFormVisible"
                :team="team"
                @dialogFormVisibleFasle="dialogFormVisibleFasle"
                @updateTeamInfo="updateTeamInfo"/>
    </div>

</template>

<script>
    import {getTeamAllInfoByTeamName, updateTeamInfo} from '@/network/api/team';
    import TeamInfo from "./components/TeamInfo";
    import Update from "./Update";

    export default {
        name: "team",
        components: {
            TeamInfo,
            Update
        },
        props: {},
        data() {
            return {
                dialogFormVisible: false,
                users: [],
                team: {}
            }
        },
        computed: {},
        created() {
            this.init(this.$route.query.teamName)
        },
        mounted() {
        },
        methods: {
            init(teamName) {
                getTeamAllInfoByTeamName(teamName).then(res => {
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    console.log(res.data)
                    this.team = res.data.team;
                    this.users = res.data.users;
                })
            },
            updateTeamInfo(team){
                console.log(team);
                updateTeamInfo(team).then(res => {
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    this.init(this.$route.query.teamName)
                    this.dialogFormVisible = false;
                })
            },
            dialogFormVisibleFasle() {
                this.dialogFormVisible = false;
            },
            toUpdateTeamInfo(){
                this.$refs.update.init();
                this.dialogFormVisible = true;
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>

</style>