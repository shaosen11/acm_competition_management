<template>
    <div>

        <!--队伍信息-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>队伍信息</span>
                <el-dropdown trigger="click" style="float: right;" v-if="this.teamUserFlag">
                              <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            @click.native="toUpdateTeamInfo"
                            v-if="this.updateFlag">修改信息
                        </el-dropdown-item>
                        <el-dropdown-item
                            @click.native="deleteTeamDialogVisible = true"
                            v-if="this.updateFlag">删除队伍
                        </el-dropdown-item>
                        <el-dropdown-item
                            @click.native="outTeamDialogVisible = true"
                            v-if="!this.updateFlag">退出队伍
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

            <el-form ref="form"
                     :model="team"
                     label-width="80px"
                     v-loading="isLoading"
                     element-loading-text="努力加载中...">
                <!--个人信息-->
                <el-row :gutter="10" type="flex" justify="center">
                    <el-col :span="20">
                        <el-form-item label="名称">
                            <span>{{ this.team.name }}</span>
                        </el-form-item>
                        <el-form-item label="队长">
                            <span>{{ this.team.userName }}</span>
                        </el-form-item>
                        <el-form-item label="座右铭">
                            <span>{{ this.team.motto }}</span>
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
            </el-form>
        </el-card>


        <!--修改弹出框-->
        <update ref="update"
                :dialogUpdateFormVisible="dialogUpdateFormVisible"
                :team="team"
                @dialogUpdateFormVisibleFasle="dialogUpdateFormVisibleFasle"
                @updateTeamInfo="updateTeamInfo"/>
        <!--退出队伍弹出框-->
        <el-dialog
            title="提示"
            :visible.sync="outTeamDialogVisible"
            width="30%"
            :before-close="outTeamHandleClose">
            <span>确认退出队伍？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="outTeamDialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="outTeam"
                    :loading="outTeamDialogButtonLoaing">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除队伍弹出框-->
        <el-dialog
            title="提示"
            :visible.sync="deleteTeamDialogVisible"
            width="30%"
            :before-close="deleteTeamHandleClose">
            <span>确认删除队伍？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTeamDialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="deleteTeam"
                    :loading="deleteTeamDialogButtonLoaing">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import {getTeamAllInfoByTeamName, updateTeamInfo, outTeam, deleteTeam} from '@/network/api/team';
import TeamInfo from "./components/TeamInfo";
import Update from "./Update";

export default {
    name: "Index",
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
            // 是否队员，退出标记
            teamUserFlag: false,
            // 是否展示修改表单
            dialogUpdateFormVisible: false,
            //队伍信息
            team: {},
            //用户信息
            users: [],
            outTeamDialogVisible: false,
            outTeamDialogButtonLoaing: false,
            deleteTeamDialogVisible: false,
            deleteTeamDialogButtonLoaing: false,
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
                //判断是否队长
                if (this.team.userId == this.$store.state.user.userId) {
                    this.updateFlag = true;
                }
                //判断是否队员
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].userId == this.$store.state.user.userId) {
                        this.teamUserFlag = true;
                    }
                }
                this.isLoading = false;
            })
        },
        //修改队伍信息
        updateTeamInfo(team) {
            updateTeamInfo(team).then(res => {
                this.dialogFormVisible = false;
                if (res.code != 200) {
                    this.dialogUpdateFormVisible = false;
                    return this.$message.success(res.message);
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
        },
        //退出队伍
        outTeam() {
            this.outTeamDialogButtonLoaing = true
            const teamUserRelation = {
                teamId: this.team.teamId,
                userId: this.$store.state.user.userId
            }
            outTeam(teamUserRelation).then(res => {
                if (res.code != 200) {
                    this.outTeamDialogButtonLoaing = true;
                    this.outTeamDialogVisible = false;
                    return this.$message.error(res.message);
                }
                this.$store.dispatch('deleteTeamInfo');
                this.outTeamDialogButtonLoaing = true;
                this.outTeamDialogVisible = false;
                this.$router.push('/teamList')
            })
        },
        //确认退出队伍
        outTeamHandleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        //删除队伍
        deleteTeam() {
            this.deleteTeamDialogButtonLoaing = true
            deleteTeam(this.team).then(res => {
                if (res.code != 200) {
                    this.deleteTeamDialogButtonLoaing = true;
                    this.deleteTeamDialogVisible = false;
                    return this.$message.error(res.message);
                }
                this.$store.dispatch('deleteTeamInfo');
                this.deleteTeamDialogButtonLoaing = true;
                this.deleteTeamDialogVisible = false;
                this.$router.push('/teamList');
            })
        },
        //确认删除队伍
        deleteTeamHandleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
    },
    filter: {},
    watch: {}
}
</script>

<style scoped>

</style>