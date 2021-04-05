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
        data() {
            return {
                options: {
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
                        data: []
                    }
                    ]
                },
                color:[
                    '#5B8FF9', '#5AD8A6', '#5AD8A6'
                ]
            }
        },
        methods: {
            init() {
                console.log(this.userRadar)
                for (let i = 0; i < this.userRadar.length; i++) {
                    const data = {
                        value: this.userRadar[i],
                        itemStyle: {
                            normal: {
                                color: this.color[i]
                            }
                        }
                    }
                    this.options.series[0].data.push(data)
                }
                this.myChartOne = echarts.init(this.$refs.userRadar)
                this.myChartOne.setOption(this.options)
            },
        },
    }
</script>

<style scoped>

</style>