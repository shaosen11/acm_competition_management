<template>
    <el-dialog title="队伍信息"
               :visible.sync="dialogUpdateFormVisible"
               width="30%" center
               @close="dialogUpdateFormVisibleFasle">
        <el-form :model="form">
            <el-form-item label="队伍名称">
                <el-input v-model="form.teamName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="队长">
                <el-input v-model="form.userName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="座右铭">
                <el-input v-model="form.teamMotto"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogUpdateFormVisibleTrue">提交</el-button>
            <el-button type="primary" @click="dialogUpdateFormVisibleFasle">返回</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Update",
        props: {
            team: {},
            dialogUpdateFormVisible: {
                type: Boolean
            }
        },
        data() {
            return {
                form:{
                    teamId: '',
                    teamName: '',
                    userId: '',
                    userName: '',
                    teamMotto: ''
                }
            }
        },
        created() {

        },
        mounted () {
        },
        methods: {
            init(){
                this.form.teamId = this.team.teamId;
                this.form.teamName = this.team.name;
                this.form.userName = this.team.userName;
                this.form.userId = this.team.userId;
                this.form.teamMotto = this.team.motto;
            },
            dialogUpdateFormVisibleTrue() {
                const team = {
                    teamId: this.form.teamId,
                    name: this.form.teamName,
                    userId: this.form.userId,
                    userName: this.form.userName,
                    motto: this.form.teamMotto
                };
                this.$emit('updateTeamInfo', team)
            },
            dialogUpdateFormVisibleFasle() {
                this.$emit('dialogUpdateFormVisibleFasle')
            }
        },
        filter: {
        },
        watch: {
        }
    }
</script>

<style scoped>

</style>