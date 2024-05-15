<script setup lang="ts">
import useUserLocal from "@/hooks/useUserLocal";
import CommonForm from "@/components/CommonForm.vue";
import {onMounted, ref} from "vue";
import useForm from "@/hooks/useForm";
import userInfoForm from "./formConfig/userInfoForm.ts";
import {message} from "ant-design-vue";
import {$editUser, $getUserInfo} from "@/api/userApi";

const {userInfo} = useUserLocal(true)
const editShow = ref(false)

function getUserInfo() {
  $getUserInfo(userInfo.userId).then(res => {
    console.log("userInfo", res)
    formConfig.value.formState = res.data
  })
}

const {formConfig} = useForm(userInfoForm)
const formRef = ref<InstanceType<typeof CommonForm>>(null)
onMounted(() => {
  getUserInfo();
})
console.log("userInfo", userInfo)
const confirmEdit = () => {
  formRef.value.onValidate(() => {
    console.log("哈哈哈", formConfig.value.formState)
    $editUser(formConfig.value.formState).then(res => {
      if (res.code === 200) {
        message.success("修改成功")
        getUserInfo();
        editShow.value = false
      } else {
        message.error("出错了，修改失败")
      }
    })
  }, () => {
    message.error("请填写完整信息")
  })
}
const mapRole = (role) => {
  switch (role) {
    case '0':
      return "学生"
    case '1':
      return "老师"
    case '2':
      return "管理员"
    default:
      return "未知"
  }
}
</script>

<template>
  <div class="info">
    <div class="item card">
      <div class="label">姓名:</div>
      <div class="value">{{ formConfig.formState.userNickName }}</div>
    </div>
    <div class="item card">
      <div class="label">年龄:</div>
      <div class="value">{{ formConfig.formState.userAge }}</div>
    </div>
    <div class="item card">
      <div class="label">住址:</div>
      <div class="value">{{ formConfig.formState.userAddress }}</div>
    </div>

    <div class="item card">
      <div class="label">电话:</div>
      <div class="value">{{ formConfig.formState.userPhone }}</div>
    </div>

    <div class="item card">
      <div class="label">角色:</div>
      <div class="value">{{ mapRole(formConfig.formState.userRole) }}</div>
    </div>

    <div @click="editShow=true" class="item card edit">
      修改个人信息
    </div>


    <a-modal @ok="confirmEdit" okText="确认修改" cancelText="取消修改" v-model:open="editShow"
             title="编辑个人信息 ">
      <CommonForm ref="formRef" :style="{'color':'black','background-color':'white','padding':'20px'}"
                  :form-config="formConfig">
      </CommonForm>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.info {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .edit {
    border: #00b1ce solid 1px !important;
    justify-content: center;
    cursor: pointer;
  }

  .item {
    font-weight: 600;
    width: 400px;
    height: 60px;
    border: 1px solid #020202;
    display: flex;
    align-items: center;
    gap: 15px;

    .label {
      color: #ef6363;
    }

  }
}
</style>