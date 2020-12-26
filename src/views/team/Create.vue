<template>
    <el-dialog title="队伍信息"
               :visible.sync="dialogCreateFormVisible"
               width="30%" center
               @close="dialogCreateFormVisibleFasle">
        <el-form :model="form">
            <el-form-item label="队伍名称">
                <el-input v-model="form.teamName"></el-input>
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
            return {
                form:{
                    teamName: '',
                    teamMotto: ''
                }
            }
        },
        created() {

        },
        mounted () {
        },
        methods: {
            dialogCreateFormVisibleTrue() {
                const team = {
                    name: this.form.teamName,
                    userId: this.$store.state.user.userId,
                    userName: this.$store.state.user.name,
                    motto: this.form.teamMotto
                };
                this.$emit('createTeam', team);
            },
            dialogCreateFormVisibleFasle() {
                this.$emit('dialogCreateFormVisibleFasle')
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