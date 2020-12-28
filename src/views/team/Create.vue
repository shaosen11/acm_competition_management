<template>
    <el-dialog title="队伍信息"
               :visible.sync="dialogCreateFormVisible"
               width="30%" center
               @close="dialogCreateFormVisibleFasle">
        <el-form ref="CreateForm"
                 :model="form"
                 :rules="rules">
            <el-form-item label="队伍名称" prop="teamName">
                <el-input v-model="form.teamName">
                </el-input>
            </el-form-item>
            <el-form-item label="座右铭">
                <el-input v-model="form.teamMotto"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogCreateFormVisibleTrue" :loading="createButtonLoading">提交</el-button>
            <el-button type="primary" @click="dialogCreateFormVisibleFasle">返回</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {getTeamByName} from "@/network/api/team";

export default {
    name: "Create",
    props: {
        dialogCreateFormVisible: {
            type: Boolean
        },
        createButtonLoading: {
            type: Boolean
        }
    },
    data() {
        var validateTeamName = (rule, value, callback) => {
            this.validateTeamName(this.form.teamName).then(res => {
                if (res) {
                    callback(new Error('队名已存在!'))
                } else {
                    callback()
                }
            })
        }
        return {
            form: {
                teamName: '',
                teamMotto: ''
            },
            /*校验规则*/
            rules: {
                teamName: [
                    {required: true, message: '请输入队名', trigger: 'blur'},
                    {required: true, validator: validateTeamName, trigger: 'blur'},
                ]
            }
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        dialogCreateFormVisibleTrue() {
            const team = {
                name: this.form.teamName,
                userId: this.$store.state.user.userId,
                userName: this.$store.state.user.name,
                motto: this.form.teamMotto
            };
            this.$refs.CreateForm.validate(async (valid) => {
                if (!valid){
                    return false;
                }
                this.$emit('createTeam', team);
            })

        },
        dialogCreateFormVisibleFasle() {
            this.$emit('dialogCreateFormVisibleFasle')
        },
        //验证队名是否存在
        async validateTeamName(teamName) {
            return await getTeamByName(teamName).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                if (res.data.userId != null) {
                    return true;
                }
                return false
            })
        },
    },
    filter: {},
    watch: {}
}
</script>

<style scoped>
</style>