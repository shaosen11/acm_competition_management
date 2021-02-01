<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-menu class="el-menu-vertical-demo" style="text-align: center">
                    <el-menu-item index="1" @click="createStoreDialogVisibleTure">
                        <i class="iconfont el-icon-third-folder-add" style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">新建文件夹</span>
                    </el-menu-item>
                    <el-menu-item v-for="(userStoreFolder, index) in this.userStoreFolder"
                                  :key="userStoreFolder"
                                  :index="index"
                                  @click="selectUserStoreFolder(userStoreFolder.id)">
                        <i class="iconfont el-icon-third-folder-open"
                           style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">{{ userStoreFolder.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <el-card style="width: 1000px">
                    <p class="name">默认文件夹</p>
                    <p class="description">这是默认文件夹</p>
                    <el-row :gutter="10">
                        <el-col :span="24" v-for="userStore in this.userStore" :key="userStore" style="margin-top: 10px">
                            <el-card shadow="hover">
                                <div v-if="userStore.blogFlag == 1">
                                    <el-tag>blog</el-tag>
                                    <span style="margin-left: 15px">{{userStore.blogName}}</span>
                                    <span style="float: right; margin-left: 15px">
                                        <i class="iconfont el-icon-third-heart" style="font-size: 20px; color: #F56C6C;"/>
                                    </span>
                                </div>
                                <div v-if="userStore.reportFlag == 1">
                                    <el-tag type="info" >report</el-tag>
                                    <span style="margin-left: 15px">{{userStore.reportName}}</span>
                                    <span style="float: right; margin-left: 15px">
                                        <i class="iconfont el-icon-third-heart"/>
                                    </span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <CreateStore :create-store-dialog-visible="this.createStoreDialogVisible"
                     @createStoreDialogVisibleFalse="createStoreDialogVisibleFalse"
                     @createStore="createStore"/>
    </div>
</template>

<script>
import CreateStore from "@/views/user/components/CreateStore";
import {getUserStoreFolder, createUserStore, listUserStoreByParentId} from "@/network/api/user"

export default {
    name: "Store",
    components: {
        CreateStore
    },
    data() {
        return {
            createStoreDialogVisible: false,
            userStoreFolder: [],
            userStore: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getUserStoreFolder()
        },
        //获取收藏夹
        getUserStoreFolder() {
            const userStore = {
                userId: this.$store.state.user.userId,
                folderFlag: 0,
            }
            getUserStoreFolder(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStoreFolder = res.data
                this.selectUserStoreFolder(this.userStoreFolder[0].id)
            })
        },
        createStoreDialogVisibleTure() {
            this.createStoreDialogVisible = true;
        },
        createStoreDialogVisibleFalse() {
            this.createStoreDialogVisible = false;
        },
        createStore(userStore) {
            createUserStore(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.createStoreDialogVisible = false;
            })
        },
        //选择收藏夹
        selectUserStoreFolder(parentId) {
            listUserStoreByParentId(parentId).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                console.log(res.data)
                this.userStore = res.data
            })
        }
    }
}
</script>

<style scoped>
.name {
    margin: 10px 0px
}

.description {
    margin: 5px 0px;
    color: #909399;
}
</style>