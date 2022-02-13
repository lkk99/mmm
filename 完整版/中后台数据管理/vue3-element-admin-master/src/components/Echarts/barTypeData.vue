<template>
    <div :id="id" style="width: 100%; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
export default {
    props: {
        id: {
            type: String,
            default: "bar"
        }
    },
    setup(props) {
        const myChart = ref(null);

        //组件挂载完毕之后执行的钩子函数
        onMounted(() => {
            myChart.value = echarts.init(document.getElementById(props.id));
            const options = getOptions();
            drawCharts(options);
        })
        //组件卸载的嘶吼清除myChart
        onBeforeUnmount(() => {
            if (!myChart) {
                return
            }
            myChart.value.dispose()
            myChart.value = null
        })
        //监听id变化，一旦id发生改变之后重新绘图
        watch(props.id, () => {
            const options = getOptions();
            drawCharts(options);
        })

        const getOptions = () => {
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                //图例控件
                legend: {
                    data: [
                        '鲜花','花束', '礼盒', '花篮', '绿植', '周花'
                    ],
                },
                //绘图区域
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                //x轴为类目轴
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
                    },
                ],
                //y轴Wie数值轴
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '鲜花',
                        type: 'bar',
                        data: [320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330, 320],
                    },
                    {
                        name: '花束',
                        type: 'bar',
                        stack: '鲜花',
                        data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
                    },
                    {
                        name: '礼盒',
                        type: 'bar',
                        stack: '鲜花',
                        data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
                    },
                    {
                        name: '花篮',
                        type: 'bar',
                        
                        data: [150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410],
                    },
                    {
                        name: '绿植',
                        type: 'bar',
                        data: [862, 1018, 964, 1026, 1679, 1600, 1570, 964, 1026, 1679, 1600, 1570],
                        // markLine: {
                        //     lineStyle: {
                        //         normal: {
                        //             type: 'dashed',
                        //         },
                        //     },
                        //     // data: [[{ type: 'min' }, { type: 'max' }]],
                        // },
                    },
                    {
                        name: '周花',
                        type: 'bar',
                        barWidth: 5,
                        
                        data: [620, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090],
                    },
                ],
            };
            return option;
        }

        const drawCharts = (option) => {
            // 使用刚指定的配置项和数据显示图表。
            myChart.value.setOption(option);
        }

    },
}
</script>