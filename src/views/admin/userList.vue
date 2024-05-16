<script setup lang="ts">
import userInfoForm from "@/views/formConfig/userInfoForm.ts"
import {userList} from './tableConfig/userList.ts'
import useTableList from "@/hooks/useTableList";
import {onMounted, ref} from "vue";
import {$delUserByid, $editUser, $getUserList} from "@/api/userApi";
import CommonForm from "@/components/CommonForm.vue";
import useForm from "@/hooks/useForm";
import {message} from "ant-design-vue";
import useUserLocal from "@/hooks/useUserLocal";

const {formConfig} = useForm(userInfoForm)
const {tableState} = useTableList(userList)
const editShow = ref(false)
const currentRow = ref({})
const formRef = ref<InstanceType<typeof CommonForm>>(null)
const {userInfo} = useUserLocal()


function getTableData() {
  $getUserList().then(res => {
    console.log("users", res)
    tableState.gridOptions.data = res.data
  })
}

function viewDetail(row) {
  editShow.value = true

  formConfig.value.formState = row
}

function log(row) {
  currentRow.value = row
}

function confirmDel(row) {
  console.log("confirmDel", currentRow.value)
  console.log("confirmDel", userInfo)
  if (userInfo.userRole != '2' || currentRow.value.userRole == '2') {
    message.error("对不起你没有该权限")
    return
  }
  $delUserByid(currentRow.value).then(res => {
    if (res.code === 200) {
      message.success("删除成功")
      getTableData();
    } else {
      message.error("出错了，删除失败")
    }
  })
}

const confirmEdit = () => {
  formRef.value.onValidate(() => {
    $editUser(formConfig.value.formState).then(res => {
      if (res.code === 200) {
        message.success("修改成功")
        getTableData();
        editShow.value = false
      } else {
        message.error("出错了，修改失败")
      }
    })
  }, () => {
    message.error("请填写完整信息")
  })
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="pending-comment">
    <div class="table">
      <Table :tableState="tableState">
        <template #userAge="{row}">
          {{ row.userAge }}
        </template>
        <template #userRole="{row}">
          <span v-if="row.userRole == 0">学生</span>
          <span v-if="row.userRole == 1">老师</span>
          <span v-if="row.userRole == 2">管理员</span>
        </template>

        <template #action="{row}">

          <a-button @click="viewDetail(row)" type="link">查看</a-button>
          <a-popconfirm
              title="你是否要删除该用户记录？"
              ok-text="是的"
              cancel-text="取消"
              @confirm="confirmDel"
          >
            <a-button @click="log(row)" type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </Table>
    </div>

    <!--  详情信息-->
    <a-modal @ok="confirmEdit" okText="修改信息" cancelText="取消修改" v-model:open="editShow"
             title="编辑个人信息 ">
      <CommonForm ref="formRef" :style="{'color':'black','background-color':'white','padding':'20px'}"
                  :form-config="formConfig">
      </CommonForm>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.pending-comment {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>