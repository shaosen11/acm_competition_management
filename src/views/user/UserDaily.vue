<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人数据统计</span>
            </div>
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
        </el-card>
    </div>
</template>

<script>
import {getUserDailyByTime} from '@/network/api/user'

export default {
    name: "UserDaily",
    data() {
        return {
            lineData: {
                columns: ["日期", "点赞数量", "关注数量", "浏览数量", "收藏数量", "博客数量", "报告数量"],
                rows: []
            },
            time: [],
            startTime: {},
            endTime: {},
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
            this.getUserDailyByTime(null);
            this.tipNotify();
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
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
                this.lineData.rows = [];
                for (let i = 0; i < res.data.length; i++) {
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
    }
}
</script>

<style scoped>
.box-card {
    width: 1000px;
    margin: auto;
}
</style>