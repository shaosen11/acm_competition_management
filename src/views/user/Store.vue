<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-menu class="el-menu-vertical-demo" style="text-align: center">
                    <el-menu-item index="1" @click="createStoreDialogVisibleTure">
                        <i class="iconfont el-icon-third-folder-add" style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">新建收藏夹</span>
                    </el-menu-item>
                    <el-menu-item v-for="(userStoreFolder, index) in this.userStoreFolder"
                                  :key="userStoreFolder"
                                  :index="index"
                                  @click="selectUserStoreFolder(index)">
                        <i class="iconfont el-icon-third-folder-open"
                           style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">{{ userStoreFolder.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="20">
                <el-card style="width: 800px">
                    <div>
                        <span class="name" v-if="this.userStoreFolderNameEditFlag == false">
                            {{ this.userStoreFolderItem.name }}
                            <i class="iconfont el-icon-third-edit icon"
                               @click="userStoreFolderNameEditFlagTrue"/>
                        </span>
                        <span v-else>
                            <el-input v-model="userStoreFolderNameCopy" style="width: 30%"
                                      placeholder="请输入收藏夹名称"></el-input>
                            <el-button type="danger"
                                       icon="el-icon-close"
                                       size="small"
                                       style="margin-left: 15px"
                                       @click="userStoreFolderNameEditFlagFalse"
                                       circle/>
                            <el-button type="success"
                                       icon="el-icon-check"
                                       size="small"
                                       @click="updateUserStoreFolderName"
                                       circle/>
                        </span>
                        <span style="float: right;">
                            <span>仅自己可见：
                                <el-switch
                                    @change="handleShowFlagStatusChange(userStoreFolderItem)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="userStoreFolderItem.showFlag">
                                </el-switch>
                                <el-divider direction="vertical"></el-divider>
                                        <i class="iconfont el-icon-third-delete"
                                           style="font-size: 20px;"
                                           @click="deleteStore(userStoreFolderItem)"/>
                            </span>
                        </span>
                    </div>
                    <p class="description" v-if="this.userStoreFolderDescriptionEditFlag == false">
                        {{ this.userStoreFolderItem.description }}
                        <i class="iconfont el-icon-third-edit icon"
                           @click="userStoreFolderDescriptionEditFlagTrue"/>
                    </p>
                    <p v-else>
                        <el-input v-model="userStoreFolderDescriptionCopy" style="width: 30%"
                                  placeholder="请输入收藏夹描述"></el-input>
                        <el-button type="danger"
                                   icon="el-icon-close"
                                   size="small"
                                   style="margin-left: 15px"
                                   @click="userStoreFolderDescriptionEditFlagFalse"
                                   circle/>
                        <el-button type="success"
                                   icon="el-icon-check"
                                   size="small"
                                   @click="updateUserStoreFolderDescription"
                                   circle/>
                    </p>
                    <el-row :gutter="10">
                        <el-col :span="24" v-for="userStore in this.userStore" :key="userStore"
                                style="margin-top: 10px">
                            <el-card shadow="hover">
                                <div>
                                    <span v-if="userStore.blogFlag == 1">
                                        <el-tag>blog</el-tag>
                                        <span class="userStoreName"
                                              @click="toBlog(userStore.blogId)">{{ userStore.blogName }}</span>
                                    </span>
                                    <span v-if="userStore.reportFlag == 1">
                                        <el-tag type="info">report</el-tag>
                                        <span class="userStoreName">{{ userStore.reportName }}</span>
                                    </span>
                                    <span style="float: right;">
                                        <span v-if="userStore.status==0">
                                            （博客已被博主删除）
                                            <el-divider direction="vertical"></el-divider>
                                        </span>
                                        <span>仅自己可见：
                                            <el-switch
                                                @change="handleShowFlagStatusChange(userStore)"
                                                :active-value="1"
                                                :inactive-value="0"
                                                v-model="userStore.showFlag">
                                            </el-switch>
                                        </span>
                                        <el-divider direction="vertical"></el-divider>
                                        <i class="iconfont el-icon-third-heart"
                                           style="font-size: 20px; color: #F56C6C;"
                                           @click="cancelStore(userStore)"/>
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
import {
    getUserStoreFolder,
    createUserStore,
    listUserStoreByParentId,
    deleteUserStore,
    updateUserStore
} from "@/network/api/user"

export default {
    name: "Store",
    components: {
        CreateStore
    },
    data() {
        return {
            createStoreDialogVisible: false,
            userStoreFolder: [],
            userStoreFolderItem: {
                id: 0,
                showFlag: 0
            },
            userStoreFolderIndex: 0,
            userStoreFolderNameEditFlag: false,
            userStoreFolderNameCopy: '',
            userStoreFolderDescriptionEditFlag: false,
            userStoreFolderDescriptionCopy: '',
            userStore: [],
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
                this.selectUserStoreFolder(this.userStoreFolderIndex)
            })
        },
        //创建文件夹
        createStoreDialogVisibleTure() {
            if (this.$store.state.user.userId == '') {
                this.$message.error("请先登录");
                return false;
            }
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
        selectUserStoreFolder(index) {
            this.userStoreFolderIndex = index;
            this.userStoreFolderItem = this.userStoreFolder[index];
            listUserStoreByParentId(this.userStoreFolderItem.id).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStore = res.data
            })
        },
        //跳转博客
        toBlog(blogId) {
            this.$router.push({
                name: 'blogInfo',
                query: {blogId}
            })
        },
        //取消收藏
        cancelStore(userStore) {
            userStore.folderFlag = 1;
            deleteUserStore(userStore).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.selectUserStoreFolder(this.userStoreFolderIndex);
            })
        },
        //删除收藏夹
        deleteStore(userStoreFolder) {
            deleteUserStore(userStoreFolder).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.userStoreFolderIndex = 0
                this.getUserStoreFolder()
            })
        },
        //是否向大家展示收藏夹内容
        handleShowFlagStatusChange(userStore) {
            const userStoreBody = {
                id: userStore.id,
                showFlag: userStore.showFlag
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.selectUserStoreFolder(this.userStoreFolderIndex)
            })
        },
        //修改收藏夹名称
        userStoreFolderNameEditFlagTrue() {
            this.userStoreFolderNameCopy = this.userStoreFolderItem.name
            this.userStoreFolderNameEditFlag = true
        },
        userStoreFolderNameEditFlagFalse() {
            this.userStoreFolderNameEditFlag = false
        },
        updateUserStoreFolderName() {
            const userStoreBody = {
                id: this.userStoreFolderItem.id,
                name: this.userStoreFolderNameCopy
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.userStoreFolderNameEditFlagFalse()
            })
        },
        //修改收藏夹描述
        userStoreFolderDescriptionEditFlagTrue() {
            this.userStoreFolderDescriptionCopy = this.userStoreFolderItem.description
            this.userStoreFolderDescriptionEditFlag = true
        },
        userStoreFolderDescriptionEditFlagFalse() {
            this.userStoreFolderDescriptionEditFlag = false
        },
        updateUserStoreFolderDescription() {
            const userStoreBody = {
                id: this.userStoreFolderItem.id,
                description: this.userStoreFolderDescriptionCopy
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.userStoreFolderDescriptionEditFlagFalse()
            })
        },
    }
}
</script>

<style scoped lang="scss">
.name {
    margin: 10px 0px;

    .icon {
        margin-left: 5px;
    }

    .icon:hover {
        color: #409EFF;
    }
}

.description {
    margin: 5px 0px;
    color: #909399;
}

.userStoreName {
    margin-left: 15px
}

.userStoreName:hover {
    color: #409EFF;
}
</style>