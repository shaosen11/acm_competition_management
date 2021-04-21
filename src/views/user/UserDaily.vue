<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <b>个人数据统计</b>
            </div>
            <el-row :gutter="20" style="margin: 10px auto">
                <el-col :span="6">
                    <el-card shadow="hover" class="report-card">
                        <h2>
                            <i class="iconfont el-icon-third-file-text" style="font-size: 20px"/>
                            {{ this.userExt.reportCounter }}
                        </h2>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover">
                        <h2 class="blog-card">
                            <i class="iconfont el-icon-third-blog" style="font-size: 20px"/>
                            {{ this.userExt.blogCounter }}
                        </h2>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" style="margin: 3px auto">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <h4 class="follow-card">
                                    <i class="iconfont el-icon-third-follow"/>
                                    {{ this.userExt.followCounter }}
                                </h4>
                            </el-col>
                            <el-col :span="6">
                                <h4 class="view-card">
                                    <i class="iconfont el-icon-third-eye"/>
                                    {{ this.userExt.visitCounter }}
                                </h4>
                            </el-col>
                            <el-col :span="6">
                                <h4 class="click-card">
                                    <i class="iconfont el-icon-third-like"/>
                                    {{ this.userExt.clickCounter }}
                                </h4>
                            </el-col>
                            <el-col :span="6">
                                <h4 class="store-card">
                                    <i class="iconfont el-icon-third-heart"/>
                                    {{ this.userExt.storeCounter }}
                                </h4>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <div style="text-align:center; margin-bottom: 10px">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="update">
                </el-date-picker>
            </div>
            <ve-line :data="lineData"/>
            <el-table
                v-loading="listLoading"
                element-loading-text="努力加载中..."
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="time"
                    label="日期"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="reportCount"
                    label="报告数量"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="blogCount"
                    label="博客数量"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="follow"
                    label="关注数量"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="visit"
                    label="浏览数量"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="click"
                    label="点赞数量"
                    width="150"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="store"
                    label="收藏数量"
                    width="150"
                    align="center">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import {getUserDailyByTime, getUserExtByUserId} from '@/network/api/user'

export default {
    name: "UserDaily",
    data() {
        return {
            lineData: {
                columns: ["日期", "点赞数量", "关注数量", "浏览数量", "收藏数量", "博客数量", "报告数量"],
                rows: []
            },
            chartSettings: {
                min: [0],
                max: [50]
            },
            time: [],
            startTime: {},
            endTime: {},
            userExt: {},
            //队伍查询条件
            //表单信息
            tableData: [],
            //是否正在加载
            listLoading: false,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载',
            });
            this.getUserDailyByTime(null);
            this.getUserExtByUserId(this.$store.state.user.userId)
            this.tipNotify();
            loading.close();
        },
        tipNotify() {
            const h = this.$createElement;
            this.$notify.info({
                title: '提示',
                message: h('i', {style: 'color: teal'}, '数据存在一定的误差，仅供参考'),
                offset: 50,
                duration: 5000
            });
        },
        getUserDailyByTime(time) {
            if (time == null) {
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                this.startTime = start;
                const end = new Date();
                this.endTime = end;
                this.time = [this.startTime, this.endTime]
            } else {
                this.startTime = time[0];
                this.endTime = time[1];
            }
            if (parseInt(Math.abs(this.endTime - this.startTime) / 1000 / 60 / 60 / 24) > 90) {
                return this.$message.error("查询不能超过90天");
            }
            const userDaily = {
                userId: this.$store.state.user.userId,
                startTime: this.startTime,
                endTime: this.endTime
            };
            getUserDailyByTime(userDaily).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.tableData = []
                this.lineData.rows = [];
                for (let i = 0; i < res.data.length; i++) {
                    this.tableData.push(res.data[res.data.length - i -1])
                    this.lineData.rows.push(
                        {
                            "日期": res.data[i].time,
                            "点赞数量": res.data[i].click,
                            "关注数量": res.data[i].follow,
                            "浏览数量": res.data[i].visit,
                            "收藏数量": res.data[i].store,
                            "博客数量": res.data[i].reportCount,
                            "报告数量": res.data[i].blogCount,
                        },
                    )
                }
            })
        },
        update() {
            this.getUserDailyByTime(this.time)
        },
        //获取用户扩展信息
        getUserExtByUserId(userId) {
            getUserExtByUserId(userId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                this.userExt = res.data
            })
        },
    }
}
</script>

<style scoped>
.box-card {
    width: 1100px;
    margin: auto;
}
.report-card {
    color: #f56c6c;
}

.blog-card{
    color: #409EFF;
}
.follow-card{
    color: #9987ce;
}
.view-card{
    color: #5AD8A6;
}
.click-card{
    color: #409EFF;
}
.store-card{
    color: #F56C6C;
}
</style>