<template>
    <el-dialog
        title="创建收藏夹"
        :visible.sync="createStoreDialogVisible"
        width="30%"
        :before-close="createStoreDialogVisibleFalse">
        <el-form ref="form" :model="userStore" label-width="100px">
            <el-form-item label="收藏夹名称">
                <el-input v-model="userStore.name"></el-input>
            </el-form-item>
            <el-form-item label="收藏夹描述">
                <el-input type="textarea" v-model="userStore.description"></el-input>
            </el-form-item>
            <el-form-item label="是否公开">
                <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="userStore.showFlag"/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="createStoreDialogVisibleFalse">取 消</el-button>
            <el-button type="primary" @click="createStore">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
export default {
    name: "CreateStore",
    props: {
        createStoreDialogVisible: {
            type: Boolean
        },
    },
    data() {
        return {
            userStore: {
                name: '',
                description: '',
                showFlag: 1,
                folderFlag: 0,
                userId: this.$store.state.user.userId
            }
        }
    },
    methods: {
        createStoreDialogVisibleFalse() {
            this.$emit('createStoreDialogVisibleFalse');
        },
        createStore() {
            this.$emit('createStore', this.userStore)
        }
    }
}
</script>

<style scoped>

</style>