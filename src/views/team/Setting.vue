<template>
    <div>
        <el-card class="index-container">
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
                                v-if="this.team.userId == this.$store.state.user.userId">解散队伍
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
                        ref="teamForm"
                        :rules="rules"
                        :model="newTeam"
                        label-width="80px"
                        v-loading="isLoading"
                        element-loading-text="努力加载中...">
                        <el-form-item label="队伍名称" prop="name">
                            <el-input
                                v-model="newTeam.name"
                                placeholder="队伍名称"
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item label="英文名称" prop="englishName">
                            <el-input
                                v-model="newTeam.englishName"
                                placeholder="英文名称"
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item label="队长">
                            <el-input v-model="newTeam.userName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="座右铭">
                            <el-input v-model="newTeam.motto"></el-input>
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
            <span>确认删除队伍吗，所有队员都将会离开对队伍？</span>
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
import {deleteTeam, getTeamByName, getTeamByEnglishName, outTeam, updateTeam} from "@/network/api/team";

export default {
    name: "Setting",
    data() {
        const validateName = (rule, value, callback) => {
            this.validateName(this.newTeam.name).then(res => {
                if (res) {
                    callback(new Error('名称已存在!'))
                } else {
                    callback()
                }
            })
        };
        const validateEnglishName = (rule, value, callback) => {
            this.validateEnglishName(this.newTeam.englishName).then(res => {
                if (res) {
                    callback(new Error('英文名称已存在!'))
                } else {
                    callback()
                }
            })
        };
        return {
            //表单数据
            team: {
                teamId: '',
                name: '',
                englishName: '',
                userId: '',
                userName: '',
                motto: ''
            },
            newTeam: {
                teamId: '',
                name: '',
                englishName: '',
                userId: '',
                userName: '',
                motto: ''
            },
            // 是否正在加载
            isLoading: false,
            //修改队伍信息按钮加载
            updateTeamInfoButtonLoading: false,
            outTeamDialogVisible: false,
            outTeamDialogButtonLoading: false,
            deleteTeamDialogVisible: false,
            deleteTeamDialogButtonLoading: false,
            /*校验规则*/
            rules: {
                name: [
                    {required: true, message: '请输入队伍名称', trigger: 'blur'},
                    {required: true, validator: validateName, trigger: 'blur'},
                ],
                englishName: [
                    {required: true, message: '请输入英文名称', trigger: 'blur'},
                    {required: true, validator: validateEnglishName, trigger: 'blur'},
                ],
            }
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
                this.team = res.data;
                this.newTeam = JSON.parse(JSON.stringify(this.team));
                this.isLoading = false
            })
        },
        //修改队伍信息
        updateTeamInfo() {
            this.updateTeamInfoButtonLoading = true
            this.$refs.teamForm.validate(async (valid) => {
                if (!valid) {
                    this.updateTeamInfoButtonLoading = false;
                    return this.$message.error("修改失败");
                }
                const res = await updateTeam(this.newTeam);
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return this.updateTeamInfoButtonLoading = false;
                }
                this.$message.success(res.message);
                this.updateTeamInfoButtonLoading = false;
                this.getTeamByName();
            })
            // updateTeam(this.team).then(res => {
            //     if (res.code != 200) {
            //         this.updateTeamInfoButtonLoading = false;
            //         return this.$message.error(res.message);
            //     }
            //     this.$message.success(res.message);
            //     this.updateTeamInfoButtonLoading = false;
            //     this.getTeamByName();
            // })
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
            deleteTeam(this.form.teamId).then(res => {
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
        //异步验证用户邮箱
        async validateName(name) {
            return await getTeamByName(name).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                if (res.data != null && res.data.teamId != null) {
                    if (res.data.name == this.team.name) {
                        return false;
                    }
                    return true;
                }
                return false;
            })
        },
        async validateEnglishName(englishName) {
            return await getTeamByEnglishName(englishName).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                if (res.data != null && res.data.teamId != null) {
                    if (res.data.englishName == this.team.englishName) {
                        return false;
                    }
                    return true;
                }
                return false;
            })
        },
    }
}
</script>

<style scoped>
</style>