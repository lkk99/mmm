<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
       <el-table-column
      type="index"
      label="编号"
      width="50">
    </el-table-column>
      <!-- <el-table-column label="编号" width="80" align="center">
        <template #default="scope">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="姓名" width="100" align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="电话"
        width="200"
        show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.abstracts }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="邮箱" width="80" align="center">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="发布时间" width="200" align="center">
        <template #default="scope">
          <span style="margin-left: 10px">
            {{ parseTime(scope.row.publishDate) }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="角色"
        width="380"
        show-overflow-tooltip="true"
        align="center"
      >
        <template #default="scope">
          <span style="margin-left: 10px">用户</span>
        </template>
      </el-table-column>
      <el-table-column label="Operations" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="size" @current-change="currentPageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { GetManageList,DeleteManage } from '@/api/manage'
import { ref, reactive, toRefs } from 'vue'
import { Timer } from '@element-plus/icons'
import { parseTime } from '@/utils'

export default {
  name: 'manageIndex',
  components: {
    Timer,
  },
  setup() {
    const list = ref([])
    const total = ref(0)
    const pageOptions = reactive({
      current: 1,
      size: 5,
    })
    const getMlist = async () => {
      const { data, total:t, code } = await GetManageList(pageOptions)
      list.value = data
      total.value = t
    }
    getMlist()
    //删除
    const handleDelete = async(index, row) => {
      console.log(row._id,'xxxxxx')
      const result = await DeleteManage({id:row._id})
      getMlist();
    }
    const handleSelectionChange = (e) => {}
    const currentPageChange = (current) =>{
      pageOptions.current=current
      getMlist();
    }
    return {
      list,
      ...toRefs(pageOptions),
      handleDelete,
      parseTime,
      handleSelectionChange,
      currentPageChange,
      total
    }
  },
}
</script>
<style lang="scss">
.block{
  text-align: center;
}
</style>