<script setup lang="ts">

import {onMounted, ref} from "vue";
import {$getTreeQuestions} from "@/api/questionApi";

const addQuestionVal = ref("")

const addShow = ref(false)

const editShow = ref(false)
const currentItem = ref({})
const searchVal = ref('')
const orginalData = ref([])

async function getQuestions() {
  let res = await $getTreeQuestions()
  orginalData.value = res.data
}

onMounted(() => {
  getQuestions()
})
function onSearch() {

}

function edit(item) {
  currentItem.value = item
  editShow.value = true
}

function editCancle() {
  getQuestions()
  editShow.value = false
}

function eidtOk() {
  console.log("eidtOk", currentItem.value)
  editShow.value = false
}

function del(row) {
  currentItem.value = row
}

function confirmDel() {
  console.log("删除 ", currentItem.value)
}

function addQuestion() {
  addShow.value = false
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
    <div class="table card">
      <div class="question-item card" v-for="item in orginalData">
        <div class="head">
          <span @click="edit(item)">编辑</span>
          <a-popconfirm
              title="确认要删除该问题？"
              ok-text="是的"
              cancel-text="取消"
              @confirm="confirmDel"
          >
            <span @click="del(item)">删除</span>
          </a-popconfirm>
        </div>
        {{ item.treeQuestionContent }}
      </div>
    </div>


    <!--    新增问题-->
    <a-modal @ok="addQuestion" okText="确认添加" cancelText="暂不添加" v-model:open="addShow"
             title="上传绘画记录 ">
      <div>
        问题内容：
        <a-textarea v-model:value="addQuestionVal" :rows="4"/>
      </div>
    </a-modal>

    <!--    编辑问题-->
    <a-modal @ok="eidtOk" @cancel="editCancle" okText="确认修改" cancelText="暂不修改" v-model:open="editShow"
             title="修改树问题 ">
      <div>
        原问题：
        <a-textarea v-model:value="currentItem.treeQuestionContent" :rows="4"/>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
/* 定义关键帧动画 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  /* 初始和结束状态，无缩放 */
  50% {
    transform: scale(1.1);
  }
  /* 中间状态，放大10% */
}
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
    background: black;

    .question-item {
      width: 200px;
      height: 260px;
      cursor: pointer;
      transition: all 1s ease-in-out; /* 添加平滑过渡效果 */

      .head {
        display: flex;
        gap: 10px;
        padding: 5px 0;
        color: #21e8ac;
        cursor: pointer;
      }
    }

    .question-item:hover {
      animation: pulse 2s infinite;
    }
  }
}
</style>