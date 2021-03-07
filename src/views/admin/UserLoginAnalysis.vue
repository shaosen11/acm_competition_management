<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>
                    用户登录日志
                </span>
            </div>
            <el-row :gutter="20">
                <el-col :span="24">
                    <ve-line :data="chartData"></ve-line>
                </el-col>
            </el-row>
        </el-card>


    </div>
</template>

<script>
    import {getUserLoginStatisticsByTime, getUserLoginLogByTime} from "@/network/api/user";

    export default {
        name: "UserLoginAnalysis",
        data() {
            return {
                chartData: {
                    columns: ["时间", "登录人数"],
                    rows: []
                },
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getUserLoginStatisticsByTime()
                this.getUserLoginLogByTime()
            },
            getUserLoginStatisticsByTime() {
                getUserLoginStatisticsByTime(this.getDate()).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                })
            },
            getUserLoginLogByTime() {
                getUserLoginLogByTime().then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    for (let i = 0; i < res.data.list.length; i++) {
                        this.chartData.rows.push({
                            "时间": res.data.list[i].time,
                            "登录人数": res.data.list[i].count,
                        })
                    }
                })
            },
            getDate() {
                let date = new Date();
                let mon = date.getMonth() + 1;
                let day = date.getDate();
                let nowDay = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
                return nowDay;
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>