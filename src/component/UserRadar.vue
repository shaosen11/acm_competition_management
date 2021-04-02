<template>
    <el-card>
        能力图
        <div class="onePxDivider"></div>
        <!--                <ve-radar :data="userRadar" :settings="radarSet" :extend="extend" style="width: 100%"></ve-radar>-->
        <div id="userRadar" style="width: 270px; height: 300px; text-align: center"></div>

    </el-card>
</template>

<script>
export default {
    name: "UserRadar",
    props: {
        userRadar: []
    },
    data() {
        return {
            radarSet: {
                label: {
                    show: true,
                },
                labelMap: {
                    problemTypeOne: "数论",
                    problemTypeTwo: "字符串",
                    problemTypeThree: "图论",
                    problemTypeFour: "网络流",
                    problemTypeFive: "数据结构",
                    problemTypeSix: "计算几何",
                    problemTypeSeven: "STL",
                    problemTypeEight: "其他",
                },
                areaStyle: {
                    opacity: 0.6,
                },
            },
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.myChartOne = echarts.init(document.getElementById('userRadar'))
            this.myChartOne.setOption(this.options)
        },
    },
    computed: {
        options() {
            let option = {
                radar: {
                    shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(131,141,158,0.1)',
                        },
                    },
                    indicator: [
                        {
                            name: '数论',
                            max: 50
                        },
                        {
                            name: '字符串',
                            max: 50
                        },
                        {
                            name: '图论',
                            max: 50
                        },
                        {
                            name: '网络流',
                            max: 50
                        },
                        {
                            name: '数据结构',
                            max: 50
                        },
                        {
                            name: '计算几何',
                            max: 50
                        },
                        {
                            name: 'STL',
                            max: 50
                        },
                    ],
                    radius: 85,//缩放
                    center: ['50%', '50%'],//位置
                    splitArea: {
                        show: false,
                        areaStyle: {
                            color: 'rgba(255,0,0,0)', // 图表背景的颜色
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: 'rgba(131,141,158,.1)', // 设置网格的颜色
                        },
                    },
                },
                series: [{
                    type: 'radar',
                    areaStyle: {normal: {}},
                    data: [{
                        value: this.userRadar,
                        itemStyle: {
                            normal: {
                                color: '#5B8FF9',
                            },
                        },
                    },
                    ]
                }
                ]
            };
            return option;
        }

    }
}
</script>

<style scoped>

</style>