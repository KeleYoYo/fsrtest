<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const menus = ref([
  {
    title: '登录注册',
    path: 'login'
  },
  {
    title: '绘画板',
    path: 'writePanel'
  },
  {
    title: '个人中心',
    path: 'center'
  },
])

function view(item) {
  router.push({
    name: item.path
  })
}
</script>

<template>
  <div class="bar card">
    <div @click="view(item)" :key="item.path" class="item-bar" v-for="(item,index) in menus">
      {{ item.title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.bar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  height: 80px;
  background-color: yellow;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;

  .item-bar {
    cursor: pointer;
  }
}
</style>