<script setup lang="ts">

import CommonForm from "@/components/CommonForm.vue";
import form1 from './formConfig/form1'
import useForm from "@/hooks/useForm";
import {ref} from "vue";
import {message} from "ant-design-vue";

const {formConfig} = useForm(form1)
const formRef = ref(null)

function submit() {
  formRef.value?.onValidate(() => {
    message.success("校验成功")
    console.log("校验成功", formConfig.value.formState)
  }, () => {
    message.error("校验失败")
  })
}
</script>

<template>
  <div style="width: 100%;height: 100%;background-color: yellow">
    <CommonForm ref="formRef" :style="{'color':'black','background-color':'white','padding':'20px'}"
                :form-config="formConfig">
      <template #button>
        <a-button @click="submit" type="primary">提交</a-button>
        <a-button>重置</a-button>
      </template>
    </CommonForm>
  </div>
</template>

<style scoped>

</style>