<script setup lang="ts">

import {onMounted, ref} from "vue";
import {$addPersonQuestion, $delPersonQuestion, $getPersonQuestions, $updatePersonQuestion,} from "@/api/questionApi";
import {message} from "ant-design-vue";

const addQuestionVal = ref("")

const addShow = ref(false)

const editShow = ref(false)
const currentItem = ref({})
const searchVal = ref('')
const orginalData = ref([])
const copyData = ref([])

async function getQuestions() {
  let res = await $getPersonQuestions()
  orginalData.value = res.data
  copyData.value = res.data
}

onMounted(() => {
  getQuestions()
})

function onSearch() {
  console.log("搜索", searchVal.value)
  if (!searchVal.value) {
    orginalData.value = copyData.value
  } else {
    orginalData.value = orginalData.value.filter(item => {
      return item.personQuestionContent.includes(searchVal.value)
    })
  }
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
  $updatePersonQuestion(currentItem.value).then(res => {
    if (res.code == 200) {
      message.success("修改成功")
      getQuestions()
      editShow.value = false
    } else {
      message.error("修改失败")
    }
  })
}

function del(row) {
  currentItem.value = row
}

function confirmDel() {
  $delPersonQuestion(currentItem.value).then(res => {
    if (res.code == 200) {
      message.success("删除成功")
      getQuestions()
    } else {
      message.error("删除失败")
    }
  })
}

function addQuestion() {
  $addPersonQuestion({
    personId: '',
    personQuestionContent: addQuestionVal.value
  }).then(res => {
    if (res.code == 200) {
      message.success("新增成功")
      getQuestions()
      addShow.value = false
    } else {
      message.error("新增失败")
    }
  })
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
        {{ item.personQuestionContent }}
      </div>
    </div>


    <!--    新增问题-->
    <a-modal @ok="addQuestion" okText="确认添加" cancelText="暂不添加" v-model:open="addShow"
             title="新增问题 ">
      <div>
        问题内容：
        <a-textarea v-model:value="addQuestionVal" :rows="4"/>
      </div>
    </a-modal>

    <!--    编辑问题-->
    <a-modal @ok="eidtOk" @cancel="editCancle" okText="确认修改" cancelText="暂不修改" v-model:open="editShow"
             title="修改问题 ">
      <div>
        问题：
        <a-textarea v-model:value="currentItem.personQuestionContent" :rows="4"/>
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
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

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