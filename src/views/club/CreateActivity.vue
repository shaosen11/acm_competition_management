<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toActivity" content="编辑活动">
                </el-page-header>
            </div>
            <el-row :gutter="20" type="flex">
                <el-col :span="24">
                    <el-form :model="activity"
                             label-width="100px">
                        <el-row :gutter="20" type="flex">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="activity.name"></el-input>
                                </el-form-item>
                                <el-form-item label="位置">
                                    <el-input v-model="activity.position"></el-input>
                                </el-form-item>
                                <el-form-item label="比赛时间" prop="time">
                                    <div class="block">
                                        <el-date-picker
                                                v-model="activity.time"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="datetimerange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="内容">
                            <mavon-editor
                                    v-model="activity.contentMd"
                                    ref="md"
                                    @imgAdd="$imgAdd"
                                    @change="change"
                                    style="min-height: 400px; margin-top: 10px"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    v-if="this.$route.query.activityId==null"
                                    type="primary"
                                    @click="create"
                                    :loading="this.isLoading"
                                    round>创建
                            </el-button>
                            <el-button
                                    v-else
                                    type="primary"
                                    @click="update"
                                    :loading="this.isLoading"
                                    round>修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {createActivity, updateActivity, getByActivityId} from '@/network/api/club';

    export default {
        name: "CreateActivity",
        data() {
            return {
                activity: {
                    activityId: '',
                    name: '',
                    userId: this.$store.state.user.userId,
                    time: '',
                    startTime: '',
                    endTime: '',
                    position: '',
                    content: '',
                    contentMd: '',
                    showFlag: 0,
                },
                isLoading: false,
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getActivityByActivityId(this.$route.query.activityId)
            },
            getActivityByActivityId(activityId) {
                if (activityId != null) {
                    getByActivityId(activityId).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.activity = res.data
                        this.activity.time = [this.activity.startTime, this.activity.endTime]
                    })
                }
            },
            change(value, render) {
                this.activity.content = render;
            },
            //创建公告
            create() {
                this.isLoading = true;
                this.activity.startTime = this.activity.time[0];
                this.activity.endTime = this.activity.time[1];
                createActivity(this.activity).then(res => {
                    if (res.code !== 200) {
                        this.isLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.isLoading = false;
                    this.$message.success(res.message);
                    this.toActivity()
                })
            },
            //修改公告
            update() {
                updateActivity(this.activity).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.getActivityByActivityId(this.$route.query.activityId)
                })
            },
            //公告列表
            toActivity() {
                this.$router.push("/club/activity")
            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file) {
                var formdata = new FormData();
                formdata.append("file", $file);
                //将下面上传接口替换为你自己的服务器接口
                axios({
                    url: "http://47.115.59.65:7777/minio/upload",
                    method: "post",
                    data: formdata,
                    headers: {"Content-Type": "multipart/form-data"}
                }).then(res => {
                    this.$refs.md.$img2Url(pos, res.data.data.url);
                });
            },
        }
    }
</script>

<style scoped>
</style>