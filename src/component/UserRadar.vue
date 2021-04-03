<template>
    <div>
        <div ref="userRadar" style="width: 100%; height: 300px; text-align: center"></div>
    </div>
</template>

<script>
    export default {
        name: "UserRadar",
        props: {
            userRadar: []
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.myChartOne = echarts.init(this.$refs.userRadar)
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
                        }]
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