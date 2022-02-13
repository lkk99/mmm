<template>
  <div>
    <el-form
      :model="editForm"
      ref="ruleFormRef"
      :rules="rules"
      label-position="left"
      label-width="80px"
      style="width: 500px; margin-left: 50px"
    >
      <el-form-item required label="商品类型" prop="incomePayType">
        <el-select
          v-model="editForm.incomePayType"
          class="filter-item"
          placeholder="请选择商品类型"
        >
          <el-option label="鲜花" value="1" />
          <el-option label="花束" value="2" />
          <el-option label="礼盒" value="2" />
          <el-option label="花篮" value="4" />
          <el-option label="绿植" value="5" />
          <el-option label="周花" value="6" />
        </el-select>
      </el-form-item>
      <el-form-item required label="商品名称" prop="name">
        <el-input
          v-model="editForm.name"
          type="datetime"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item required label="店铺价" prop="price">
        <el-input v-model="editForm.price" placeholder="请输入商品价格" />
      </el-form-item>
      <el-form-item required label="市场价" prop="current_price">
        <el-input v-model="editForm.current_price" placeholder="请输入市场价" />
      </el-form-item>
      <el-form-item required label="销售量" prop="sales">
        <el-input v-model="editForm.sales" placeholder="请输入销售量" />
      </el-form-item>
      <el-form-item label="备注" prop="attach">
        <el-input
          v-model="editForm.attach"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="closeTag()">取消</el-button>
        <el-button type="primary" @click="updateForm('')">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createCash } from '@/api/goods'
import {reactive, toRefs, ref } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
    // props: ['id'],
    setup() {
        const { closeTag } = useCloseTag()
        const router = useRouter()
        const ruleFormRef = ref()

        // const ruleForm = reactive({
        //     name: '',
        //         price: '',
        //         current_price: '',
        //         attarch: '',
        //         accoutCash: '',
        //         remarks: '',
        // })
        const state = reactive({
            rules: {
                incomePayType: [
                    { required: true, message: '商品类型必填', trigger: 'change' },
                ],
                name: [
                    {
                        required: true,
                        message: '商品名称必填',
                        trigger: 'blur',
                    },
                ],
                price: [{ required: true, message: '商品价格必填', trigger: 'blur' }],
                pay: [{ required: true, message: '商品数量必填', trigger: 'blur' }],
                current_price:[{ required: true, message: '市场价', trigger: 'blur'}],
                sales:[{ required: true, message: '市场价', trigger: 'blur'}],
                
                attach: [],
            },
            editForm: {
              incomePayType:'',
               name: '',
                price: '',
                pay:'',
                sales:'',
                current_price: '',
                attach: '',
                // accoutCash: '',
                // remarks: '',
                img:'https://upyun.dinghuale.com/uploads/20200717/202007171204054141.jpg'
            },
        })

       

        //更新数据
        const updateForm = () => {
            ruleFormRef.value.validate(async (valid) => {
                // 表单校验通过
                if (valid) {
                  console.log(state.editForm)
                    const result = await createCash(state.editForm)
                    if (+result.code === 0) {
                        //先给用户添加成功的提示
                        ElMessage('商品新增成功')
                        ruleFormRef.value.resetFields()
                        closeTag.value();

                        //隔一秒之后跳转页面
                        setTimeout(() => {
                            router.push('/goods/index')
                            

                        }, 1000);
                    }
                }
            })
        }
        const resetForm = () => {
            ruleFormRef.value.resetFields()
        }
        return { ...toRefs(state), closeTag, updateForm,ruleFormRef,resetForm }
    },
}
</script>