<template>
    <el-dialog
        title="创建收藏夹"
        :visible.sync="storeDialogVisible"
        width="30%"
        :before-close="storeDialogVisibleFalse">
        <el-form ref="form" label-width="100px">
            <el-form-item label="收藏夹：">
                <el-select v-model="id" placeholder="请选择">
                    <el-option
                        v-for="item in this.userStoreFolder"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="storeDialogVisibleFalse">取 消</el-button>
            <el-button type="primary" @click="store">收 藏</el-button>
          </span>
    </el-dialog>
</template>

<script>
export default {
    name: "CreateStore",
    props: {
        userStoreFolder: {
            Array
        },
        storeDialogVisible: {
            type: Boolean
        },
    },
    data() {
        return {
            id: '',
        }
    },
    methods: {
        storeDialogVisibleFalse() {
            this.$emit('storeDialogVisibleFalse');
        },
        store() {
            this.$emit('store', this.id)
        }
    }
}
</script>

<style scoped>

</style>