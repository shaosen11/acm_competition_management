<template>
    <div>
        <div ref="userRadar" style="width: 100%; height: 320px; text-align: center"></div>
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
                    ],
                    legend: {
                        top: '2%',
                        align: 'left',
                        data:[],
                        show: true,
                        icon: 'roundRect',
                    },
                    tooltip :{                                      //提示框组件
                        trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                        triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
                        showContent:true,                           //是否显示提示框浮层
                        showDelay:0,                                  //浮层显示的延迟，单位为 ms
                        hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
                        enterable:false,                             //鼠标是否可进入提示框浮层中
                        confine:false,                               //是否将 tooltip 框限制在图表的区域内
                        transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
                        position:['50%', '50%'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
                        borderColor:"#ccc",                        //边框颜色
                        borderWidth:0,                              //边框线宽
                        padding:5,                                  //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
                    },
                },
                color:[
                    '#5B8FF9', '#5AD8A6', '#ff6159'
                ]
            }
        },
        methods: {
            init() {
                this.options.series[0].data = []
                for (let i = 0; i < this.userRadar.length; i++) {
                    const value = [
                        this.userRadar[i].problemTypeOne,
                        this.userRadar[i].problemTypeTwo,
                        this.userRadar[i].problemTypeThree,
                        this.userRadar[i].problemTypeFour,
                        this.userRadar[i].problemTypeFive,
                        this.userRadar[i].problemTypeSix,
                        this.userRadar[i].problemTypeSeven,
                        this.userRadar[i].problemTypeEight,
                    ]
                    if (this.userRadar[i].name==null||this.userRadar[i].name==''){
                        this.userRadar[i].name = this.userRadar[i].userName
                    }
                    const data = {
                        value: value,
                        name: this.userRadar[i].name,
                        itemStyle: {
                            normal: {
                                color: this.color[i]
                            }
                        }
                    }
                    this.options.series[0].data.push(data)
                    this.options.legend.data.push(this.userRadar[i].name)
                }
                this.myChartOne = echarts.init(this.$refs.userRadar)
                this.myChartOne.setOption(this.options)
            },
        },
    }
</script>

<style scoped>

</style>