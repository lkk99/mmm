<template>
  <pro-table
    ref="table"
    title="列表"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
    </template>
    <!-- <template #createTime="{ row }">{{ parseTime(row.createTime) }}</template> -->
<template #id>
   <el-table-column
      type="index"
      label="编号"
      width="50">
    </el-table-column>
    </template>
    <template #payType="{ row }">{{ incomeTypeTransfer(row.incomePayType) }}</template>
    <template #operate="scope">
      <el-button size="mini" type="primary" @click="$router.push(`/goods/edit/${scope.row._id}`)">编辑</el-button>
      <el-button size="mini" type="danger" @click="deleleRow(scope.row)">删除</el-button>
    </template>
  </pro-table>
</template>


<script>
import { fetchList, deleteCash } from '@/api/goods'
import { TestApi } from '@/api/test'
import { defineComponent, reactive, ref, toRefs, computed } from 'vue'
import { parseTime } from '@/utils'
export default {
  name: 'goodsIndex',
  setup() {
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        {  tdSlot: 'id',   },
        // {
        //   label: '创建时间',
        //   prop: 'createTime',
        //   align: 'center',
        //   width: 180,
        //   sortable: true,
        //   tdSlot: 'createTime',
        // },
        {
          label: '商品类型',
          prop: 'incomePayType',
          align: 'center',
          width: 100,
          tdSlot: 'payType',
          //筛选
          filters: [
            { text: '鲜花', value: '1' },
            { text: '花束', value: '2' },
            { text: '礼盒', value: '3' },
            { text: '花篮', value: '4' },
            { text: '绿植', value: '5' },
            { text: '周花', value: '6' },
          ],
        },
        { label: '商品名称', prop: 'name', align: 'center' },
        { label: '店铺价', prop: 'price', align: 'center', width: 100, },
        { label: '市场价', prop: 'current_price', width: 100, align: 'center' },
        { label: '备注', prop: 'attach', width: 120, align: 'center' },
        {
          label: '操作',
          width: 180,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
      ],
      // 搜索配置
      searchConfig: {
        labelWidth: '90px', // 必须带上单位
        inputWidth: '360px', // 必须带上单位
        fields: [
          {
            type: 'text',
            label: '商品名称',
            name: 'remarks',
            defaultValue: '',
          },
        ],
      },
      // 分页配置
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
        pageSize: 5, // 每页条数
        pageSizes: [5, 10, 20, 50],
        style: { textAlign: 'left' },
      },
      selectedItems: [],
      batchDelete() {
        console.log(state.selectedItems)
      },
      // 请求函数
      async getList(params) {
        console.log(params, 'xxxx')

        const { data, total } = await fetchList(params)

        // 必须要返回一个对象，包含data数组和total总数
        return {
          data,
          total: total,
        }
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const ceshi = async () => {
      const { data } = await TestApi()
      console.log(data, 'ddddddddddddddd')
    }
    const incomeTypeTransfer = computed(() => type => {
      if (+type === 2) {
        return '花束'
      } else if (+type === 3) {
        return '礼盒'
      } else if (+type === 4) {
        return '花篮'
      } else if (+type === 5) {
        return '绿植'
      } else if(+type===6){
        return '周花'
      }
      else{
        return '鲜花'
      }
    })
    const deleleRow = row => {
      console.log(row._id, 'xxxxxxxxxxxx')
      deleteCash({ id: row._id })
        table.value.refresh()
    }

    return {
      ...toRefs(state),
      refresh,
      table,
      incomeTypeTransfer,
      parseTime,
      deleleRow,
      ceshi
    }
  },
}
</script>
