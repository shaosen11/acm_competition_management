<template>
    <el-dialog
            title="个人信息"
            :visible.sync="dialogUpdateFormVisible"
            width="30%"
            center
            @close="dialogUpdateFormVisibleFasle">
        <el-form :model="form">
            <el-form-item label="学号">
                <el-input v-model="form.userId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <template>
                    <el-radio v-model="form.gender" label="1"><i class="el-icon-female"></i>男</el-radio>
                    <el-radio v-model="form.gender" label="0"><i class="el-icon-male"></i>女</el-radio>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateUserInfo">提交</el-button>
            <el-button type="primary" @click="dialogUpdateFormVisibleFasle">返回</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import store from '@/store';
    import {getUserInfo} from '@/network/api/user';
    import {mapGetters} from 'vuex';

    export default {
        name: "update",
        props: {
            dialogUpdateFormVisible: {
                type: Boolean
            }
        },
        data() {
            return {
                form: {
                    userId: '',
                    username: '',
                    userIcon: '',
                    email: '',
                    gender: '1',
                    organizationYear: '2017',
                    organizationName: '软件工程服务外包1班',
                    teamName: ''
                },
            }
        },
        created() {
            this.getUserInfo(store.getters.userId);
        },
        mounted() {
        },
        methods: {
            getUserInfo(userId) {
                getUserInfo(userId).then(res => {
                    this.form.userId = res.data.userId;
                    this.form.username = res.data.name;
                    this.form.email = res.data.email;
                    this.form.gender = res.data.gender;
                })
            },
            updateUserInfo() {
                const user = {
                    userId: this.form.userId,
                    name: this.form.username,
                    email: this.form.email,
                    gender: this.form.gender
                }
                this.$emit('updateUserInfo', user)
            },
            dialogUpdateFormVisibleFasle() {
                this.$emit('dialogUpdateFormVisibleFasle')
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>

</style>