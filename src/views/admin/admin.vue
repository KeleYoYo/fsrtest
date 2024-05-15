<script setup lang="ts">
import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons-vue";
import {h, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const items = ref([
  {
    key: 'usermange',
    icon: () => h(AppstoreOutlined),
    label: '用户管理',
    title: '用户管理',
    children: [
      {
        key: 'userlist',
        label: '用户列表',
        title: '用户列表',
      },
    ],
  },
  {
    key: 'articleMange',
    icon: () => h(SettingOutlined),
    label: '文章管理',
    title: '文章管理',
    children: [
      {
        key: 'articlelist',
        label: '文章列表',
        title: '文章列表',
      },
    ],
  },
  {
    key: 'studentPainting',
    icon: () => h(SettingOutlined),
    label: '学生绘画记录',
    title: '学生绘画记录',
    children: [
      {
        key: 'paintingList',
        label: '全部绘画列表',
        title: '全部绘画列表',
      },
      {
        key: 'pendingQuestion',
        label: '待提问',
        title: '待提问',
      },
      {
        key: 'pendingComment',
        label: '待给出评语',
        title: '待给出评语',
      },
    ],
  },
]);
const selectedKeys = ref(['usermange']);
const menuClick = (e) => {
  router.push({
    name: e.key,
  })
}
</script>

<template>
  <div class="admin-container">
    <div class="left">
      <a-menu
          @click="menuClick"
          v-model:selectedKeys="selectedKeys"
          style="width: 320px"
          mode="inline"
          theme="dark"
          :items="items"
      />
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>

.admin-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-wrap: nowrap;

  .left {
    width: 320px;
    background-color: rgb(4, 20, 41);
  }

  .right {
    flex: 1;
  }
}

</style>