<template>
  <div class="login">
    <div class="form  card">
      <div class="header">
        <div @click="formType = 'login'" :class="`transparent-button ${formType === 'login' ? 'active' : ''}`">
          我要登录
        </div>
        <div @click="formType = 'register'" :class="`transparent-button ${formType === 'register' ? 'active' : ''}`">
          我要注册
        </div>
      </div>
      <div class="my_form">
        <CommonForm v-show="formType === 'login'" ref="loginFormRef"
                    :style="{'color':'black','background-color':'','padding':'20px','fontWeight':'bold'}"
                    :form-config="LoginForm">
        </CommonForm>
        <CommonForm v-show="formType === 'register'" ref="registerFormRef"
                    :style="{'color':'black','background-color':'','padding':'20px','fontWeight':'bold'}"
                    :form-config="RegisterForm">
        </CommonForm>
        <a-button @click="submit" style="padding: 5px 20px;font-weight: bold;color: white" type="primary">
          {{ formType == 'login' ? '登录' : '注册' }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>

import CommonForm from "@/components/CommonForm.vue";
import loginForm from './formConfig/loginForm.ts'
import registerFormConfig from './formConfig/registerForm.ts'
import {ref, toRaw} from "vue";
import {message} from "ant-design-vue";
import useForm from "@/hooks/useForm";
import {$register, $userLogin} from "@/api/userApi.ts";
import useUserLocal from "@/hooks/useUserLocal.ts";

const formType = ref('login')


const {formConfig: LoginForm} = useForm(loginForm)
const {formConfig: RegisterForm} = useForm(registerFormConfig)
const loginFormRef = ref(null)
const registerFormRef = ref(null)
const {userInfo} = useUserLocal()
console.log("userInfo", userInfo)
const submit = () => {
  if (formType.value == 'login') {
    loginFormRef.value.onValidate(() => {
      $userLogin(toRaw(LoginForm.value.formState)).then(res => {
        console.log("登录", res)
        if (res.code === 200) {
          message.success("登录成功")
          localStorage.setItem("userInfo", JSON.stringify(res.data))
        } else {
          message.error(res.message)
        }
      })
    }, () => {
      message.error("登录请认真填写表单内容")
    })
  } else {
    registerFormRef.value.onValidate(() => {
      console.log("校验成功", RegisterForm.value.formState)
      $register(toRaw(RegisterForm.value.formState)).then(res => {
        if (res.code === 200) {
          message.success("注册成功，快去登录吧")
        } else {
          message.error(res.message)
        }
      })
    }, () => {
      message.error("注册请认真填写表单内容")
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  //background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    background-color: #0472a1;
    width: 405px;
    height: 500px;

    .header {
      display: flex;
      gap: 15px;
      padding: 0 20px;

      .transparent-button {
        background-color: transparent;
        border: 1px solid #ffffff;
        color: #ffffff;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        transition: all 0.3s ease;

        /* 如果需要圆角按钮 */
        border-radius: 4px;
      }

      .transparent-button:hover {
        background-color: rgba(236, 160, 160, 0.5);
        color: #000000;
      }

      .transparent-button.active {
        background-color: rgba(236, 160, 160, 0.5);
        color: #000000;
      }
    }
  }
}
</style>