<template>
    <div>
        <el-card class="table-container">
            <div slot="header" class="clearfix">
                <div slot="header" class="clearfix">
                    <span>队伍设置</span>
                    <el-dropdown trigger="click" style="float: right;">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                @click.native="deleteTeamDialogVisible = true"
                                v-if="this.form.userId == this.$store.state.user.userId">删除队伍
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-else
                                @click.native="outTeamDialogVisible = true">退出队伍
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-row>
                <el-col :span="10">
                    <el-form
                        :model="form"
                        label-width="80px"
                        v-loading="isLoading"
                        element-loading-text="努力加载中...">
                        <el-form-item label="队伍名称">
                            <el-input v-model="form.teamName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="队长">
                            <el-input v-model="form.userName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="座右铭">
                            <el-input v-model="form.teamMotto"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="updateTeamInfoButtonLoading"
                                @click="updateTeamInfo"
                                round>修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>

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
                    :loading="outTeamDialogButtonLoading">确 定</el-button>
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
                    :loading="deleteTeamDialogButtonLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deleteTeam, getTeamByName, outTeam, updateTeamInfo} from "@/network/api/team";

export default {
    name: "Setting",
    data() {
        return {
            //表单数据
            form: {
                teamId: '',
                teamName: '',
                userId: '',
                userName: '',
                teamMotto: ''
            },
            // 是否正在加载
            isLoading: false,
            //修改队伍信息按钮加载
            updateTeamInfoButtonLoading: false,
            outTeamDialogVisible: false,
            outTeamDialogButtonLoading: false,
            deleteTeamDialogVisible: false,
            deleteTeamDialogButtonLoading: false,
        }
    },
    created() {
        this.init()
    },
    methods: {
        //初始化
        init() {
            this.getTeamByName()
        },
        //获取队伍信息
        getTeamByName() {
            this.isLoading = true
            getTeamByName(this.$store.state.team.teamName).then(res => {
                if (res.code != 200) {
                    this.isLoading = false
                    return this.$message.error(res.message);
                }
                this.form.teamId = res.data.teamId;
                this.form.teamName = res.data.name;
                this.form.userId = res.data.userId;
                this.form.userName = res.data.userName;
                this.form.teamMotto = res.data.motto;
                this.isLoading = false
            })
        },
        //修改队伍信息
        updateTeamInfo() {
            this.updateTeamInfoButtonLoading = true
            const team = {
                teamId: this.form.teamId,
                name: this.form.teamName,
                userName: this.form.userName,
                motto: this.form.teamMotto
            };
            updateTeamInfo(team).then(res => {
                if (res.code != 200) {
                    this.updateTeamInfoButtonLoading = false;
                    return this.$message.error(res.message);
                }
                this.updateTeamInfoButtonLoading = false;
                this.init();
            })
        },
        //退出队伍
        outTeam() {
            this.outTeamDialogButtonLoading = true
            const teamUserRelation = {
                teamId: this.form.teamId,
                userId: this.$store.state.user.userId
            }
            outTeam(teamUserRelation).then(res => {
                if (res.code != 200) {
                    this.outTeamDialogButtonLoading = true;
                    this.outTeamDialogVisible = false;
                    return this.$message.error(res.message);
                }
                this.$store.dispatch('deleteTeamInfo');
                this.outTeamDialogButtonLoading = true;
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
            this.deleteTeamDialogButtonLoading = true
            deleteTeam(this.team).then(res => {
                if (res.code != 200) {
                    this.deleteTeamDialogButtonLoading = true;
                    this.deleteTeamDialogVisible = false;
                    return this.$message.error(res.message);
                }
                this.$store.dispatch('deleteTeamInfo');
                this.deleteTeamDialogButtonLoading = true;
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
    }
}
</script>

<style scoped>
.table-container {
    width: 1000px;
}
</style>