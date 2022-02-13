<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-card>
          <div class="demo-fit">
            <div v-for="fit in fits" :key="fit" class="block">
              <span class="title"></span>
              <el-avatar
                shape="square"
                :size="100"
                :fit="fit"
                src="./src/assets/img/flower.png"
              ></el-avatar>
              <p>你好{{ userinfo.name }}，工作愉快！</p>
              <h3>销量数据视图</h3>
              <div class="echart">
                <barTypeDataVue></barTypeDataVue>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div>
            <el-calendar v-model="value" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { defineComponent, ref } from 'vue'
import { useUserinfo } from '@/components/Avatar/hooks/useUserinfo'
import circleType from '../../components/Echarts/circleType.vue'
import barTypeDataVue from '@/components/Echarts/barTypeData.vue'
export default {
  components: { circleType, barTypeDataVue },
  name: 'userIndex',
  setup() {
    const value = ref(new Date())
    const { userinfo } = useUserinfo()
    const state = reactive({
      fits: ['contain'],
    })

    return {
      ...toRefs(state),
      userinfo,
      value,
    }
  },
}
</script>
<style>
.echart {
  margin-top: 50px;
}
h3 {
  margin-top: 30px;
  font-size: 30px;
  color: orangered;
  text-align: center;
}
</style>