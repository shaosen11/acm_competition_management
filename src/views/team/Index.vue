<template>
    <div>
        <el-form ref="form"
                 :model="team"
                 label-width="80px"
                 v-loading="isLoading"
                 element-loading-text="努力加载中...">
            <el-row :gutter="20">
                <!--个人信息-->
                <el-col :span="16">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>队伍信息</span>
                            <el-button style="float: right; padding: 3px 0"
                                       type="text"
                                       @click="toUpdateTeamInfo"
                                       v-if="this.updateFlag">修改
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
                :dialogUpdateFormVisible="dialogUpdateFormVisible"
                :team="team"
                @dialogUpdateFormVisibleFasle="dialogUpdateFormVisibleFasle"
                @updateTeamInfo="updateTeamInfo"/>
    </div>

</template>

<script>
    import {getTeamAllInfoByTeamName, updateTeamInfo, judgeTeamUser} from '@/network/api/team';
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
                // 是否正在加载
                isLoading: false,
                // 是否队长，修改标记
                updateFlag: false,
                // 是否展示修改表单
                dialogUpdateFormVisible: false,
                //队伍信息
                team: {},
                //用户信息
                users: [],

            }
        },
        computed: {},
        created() {
            //初始化
            this.init(this.$route.query.teamName)
        },
        mounted() {
        },
        methods: {
            //初始化方法
            init(teamName) {
                this.isLoading = true;
                getTeamAllInfoByTeamName(teamName).then(res => {
                    if (res.code != 200) {
                        return this.$message.success(res.message);
                    }
                    this.team = res.data.team;
                    this.users = res.data.users;
                    if (this.team.userId == this.$store.state.user.userId) {
                        this.updateFlag = true;
                    }
                    this.isLoading = false;
                })
            },
            //修改用户信息
            updateTeamInfo(team) {
                updateTeamInfo(team).then(res => {
                    this.dialogFormVisible = false;
                    if (res.code != 200) {
                        this.$message.success(res.message);
                    }
                    this.init(this.$route.query.teamName);
                    this.dialogUpdateFormVisible = false;
                })
            },
            //隐藏修改表单
            dialogUpdateFormVisibleFasle() {
                this.dialogUpdateFormVisible = false;
            },
            //显示修改表单
            toUpdateTeamInfo() {
                this.$refs.update.init();
                this.dialogUpdateFormVisible = true;
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>

</style>