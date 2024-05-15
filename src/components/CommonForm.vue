<script setup lang="ts">
import {reactive, ref} from 'vue';

const showForm = ref(false)
const asyncOptions = reactive({})
const props = defineProps({
  formConfig: {
    type: Object,
    default: () => {
    }
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: '100%'
      }
    }
  }
})
const formRef = ref(null) // 通过 ref 绑定子组件

function show() {
  showForm.value = true
}

/**
 * @description 表单校验
 * @param successCallback 校验成功的回调
 * @param failedCallback 校验失败的回调
 * */
function onValidate(successCallback: Function, failedCallback: Function) {
  formRef?.value
      .validate()
      .then(() => {
        successCallback()
      })
      .catch(error => {
        failedCallback()
      })
      .finally(() => {
        showForm.value = false
      })
};
const resetForm = () => {
  formRef?.value.resetFields();
};
const buttonWraper = () => {
  if (props.formConfig.layout == 'horizontal') {
    return {span: props.formConfig.wrapperCol?.span, offset: props.formConfig.labelCol?.span}
  } else {
    return {}
  }
}
defineExpose({
  show,
  resetForm,
  onValidate
})
</script>

<template>
  <div :style="props.style" id="form" class="common-form">
    <slot name="header"></slot>
    <div class="form">
      <a-form :layout="formConfig.layout" :disabled="props.formConfig.disabled" ref="formRef" :rules="formConfig.rules"
              :model="props.formConfig.formState" :label-col="props.formConfig.labelCol"
              :wrapper-col="props.formConfig.wrapperCol">

        <a-form-item :name="item.filed" v-for="item in props.formConfig.stateItem" :label="item.label">
          <!--          输入框类型-->
          <a-input :disabled="item.disabled" v-if="item.type=='input'"
                   v-model:value="props.formConfig.formState[item.filed]"/>

          <!--          单项下拉选择类型-->
          <a-select v-if="item.type=='select'" v-model:value="props.formConfig.formState[item.filed]"
                    :disabled="item.disabled"
                    placeholder="请选择" style="width: 100%" :options="item.options">
          </a-select>

          <!--          文本域类型-->
          <a-textarea :disabled="item.disabled" v-if="item.type=='textarea'"
                      v-model:value="props.formConfig.formState[item.filed]" placeholder="请输入" :rows="6"/>

          <!--          密码框类型-->
          <a-input-password v-model:value="props.formConfig.formState[item.filed]"
                            :disabled="item.disabled" v-if="item.type=='password'" placeholder="请输入"/>
        </a-form-item>

        <a-form-item :wrapper-col="buttonWraper()">
          <div class="btns">
            <slot name="button"></slot>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" scoped>

.common-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 100%;

  .form {
    width: 100%;
    height: 100%;

    .btns {
      display: flex;
      gap: 20px;
    }
  }
}
</style>