<template>
  <div :id="id" style="width: 100%; height: 800px"></div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
export default {
  props: {
    id: {
      type: String,
      default: 'bar',
    },
  },
  setup(props) {
    const myChart = ref(null)

    //组件挂载完毕之后执行的钩子函数
    onMounted(() => {
      myChart.value = echarts.init(document.getElementById(props.id))
      const options = getOptions()
      drawCharts(options)
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
      const options = getOptions()
      drawCharts(options)
    })

    const getOptions = () => {
      var option = {
        title: {
          text: '销售数据视图',
          left: 'center',
          top: 'center',
        },
         legend: {
          data: ['花束', '礼盒', '花篮', '绿植', '周花'],
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: '花束',
                
              },
              {
                value: 234,
                name: '礼盒',
              },
              {
                value: 1548,
                name: '花篮',
              },
               {
                value: 1548,
                name: '绿植',
              },
               {
                value: 1548,
                name: '周花',
              },
            ],
            radius: ['40%', '70%'],
          },
        ],
      }
      return option
    }

    const drawCharts = option => {
      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option)
    }
  },
}
</script>
