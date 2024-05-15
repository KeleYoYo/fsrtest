<script setup lang="ts">
import {onMounted, ref} from "vue";
import {tableConfig} from "./tableConfig/index";
import useTableList from "@/hooks/useTableList";
import {$getPaintingList, $questionStudent} from "@/api/paintingApi";
import useTreeQuestions from "@/hooks/useTreeQuestions";
import usePersonQuestions from "@/hooks/usePersonQuestions";
import useRoomQuestions from "@/hooks/useRoomQuestions";
import {renturnQuestionStr} from '@/utils/questionUtils'
import {message} from "ant-design-vue";
import useUserLocal from "@/hooks/useUserLocal";

const {userInfo} = useUserLocal()
console.log("userInfo", userInfo)

const visibleDetail = ref(false)
const currentRow = ref({})

const re = ref(null)
const {tableState} = useTableList(tableConfig)
const {treeQuestion} = useTreeQuestions()
const {personQuestion} = usePersonQuestions()
const {roomQuestion} = useRoomQuestions()

const roomValue = ref([])
const personValue = ref([])
const treeValue = ref([])

// sub1*sub2*sub3
function handleConfirm() {
  if (roomValue.value.length <= 0) {
    message.warning("请选择关于房的提问")
    return
  }
  if (treeValue.value.length <= 0) {
    message.warning("请选择关于树的提问")
    return
  }
  if (personValue.value.length <= 0) {
    message.warning("请选择关于人的提问")
    return
  }
  let str = renturnQuestionStr(roomValue.value, treeValue.value, personValue.value)
  console.log("userId", userInfo.userId)
  $questionStudent(2, str).then(res => {
    console.log("提问完成", res)
    if (res.code == 200 && res.data > 0) {
      getTableData()
      visibleDetail.value = false
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  })
}

function getTableData() {
  $getPaintingList(1).then(res => {
    tableState.gridOptions.data = res.data
  })
}

onMounted(() => {
  $getPaintingList(1).then(res => {
    console.log("$getPaintingList", res)
    tableState.gridOptions.data = res.data
  })
})
const showDetail = (row) => {
  currentRow.value = row
  visibleDetail.value = true
}
</script>

<template>
  <div class="pendingQuestion full">
    <div>header</div>

    <div class="table">
      <Table :tableState="tableState">
        <template #paintingImg="{row}">
          <img style="width: 150px;height: 150px" :src="row.paintingImg" alt=""/>
        </template>
        <template #action="{row}">
          <div>
            <a-button @click="showDetail(row)" type="link">画像提问</a-button>
            <a-button type="link">删除</a-button>
          </div>
        </template>
      </Table>
    </div>

    <a-modal @ok="handleConfirm" style="width: 900px;height: 800px;overflow-y: auto" v-model:open="visibleDetail"
             okText="确认"
             cancelText="取消"
             title="学生绘画记录 ">
      <div style="display: flex;flex-direction: column;align-items: center" class="container">
        <img style="width: 400px;height: 400px" :src="currentRow.paintingImg" alt=""/>
      </div>

      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">学生姓名:</div>
        <div>
          {{ currentRow.author.userNickName }}
        </div>
      </div>
      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px;">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">年龄:</div>
        <div>
          {{ currentRow.author.userAge }}
        </div>
      </div>
      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">学生自评:</div>
        <div>
          {{ currentRow.selfAssessment }}
        </div>
      </div>
      <h3 style="font-weight: bold;color: #17c2e0; padding: 10px 0">请你对学生进行提问</h3>

      <div style="padding: 10px">
        <div>房：</div>
        <a-select
            mode="multiple"
            v-model:value="roomValue"
            :options="roomQuestion"
            placeholder=""
            style="width: 400px"
        ></a-select>
      </div>

      <div style="padding: 10px">
        <div>树：</div>
        <a-select
            mode="multiple"
            v-model:value="treeValue"
            :options="treeQuestion"
            placeholder=""
            style="width: 400px"
        ></a-select>
      </div>

      <div style="padding: 10px">
        <div>人：</div>
        <a-select
            mode="multiple"
            v-model:value="personValue"
            :options="personQuestion"
            placeholder=""
            style="width: 400px"
        ></a-select>
      </div>

    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.pendingQuestion {
  color: red;
  padding: 30px;
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>