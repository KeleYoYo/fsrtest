<script setup lang="ts">

import {ref} from "vue";

const addShow = ref(false)
const searchVal = ref('')

function onSearch() {

}
</script>

<template>
  <div class="full">
    <div class="header card">
      <a-button @click="addShow = true" type="primary">新增树问题</a-button>
      <a-input-search
          v-model:value="searchVal"
          placeholder="模糊查询"
          style="width: 200px"
          @search="onSearch"
      />
    </div>
    <div class="table card"> 1</div>


    <!--    新增问题-->
    <a-modal okText="确认添加" cancelText="暂不添加" v-model:open="addShow"
             title="上传绘画记录 ">
      1
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.full {
  //background-color: yellow;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .header {
    height: 120px;
    display: flex;
    gap: 15px;
  }

  .table {
    flex: 1;
  }
}
</style>