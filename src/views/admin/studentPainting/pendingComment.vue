<script setup lang="ts">
import {pendingComment} from "@/views/admin/studentPainting/tableConfig/pendingComment";
import useTableList from "@/hooks/useTableList";
import {$deletePainting, $getPaintingList, $giveReport} from "@/api/paintingApi";
import {computed, onMounted, ref} from "vue";
import {returnQuestionArr} from "@/utils/questionUtils";
import {message} from "ant-design-vue";

const {tableState} = useTableList(pendingComment)

const remarkValue = ref('')

const currentRow = ref({})

const visibleDetail = ref(false)

function getTableData() {
  $getPaintingList(3).then(res => {
    tableState.gridOptions.data = res.data
  })
}

const questionArr = computed(() => {
  let data = returnQuestionArr(currentRow.value.paintingQuestion)
  console.log("data", data)
  return data
})

const showDetail = (row) => {
  currentRow.value = row
  visibleDetail.value = true
}

function handleComment() {
  if (!remarkValue.value) {
    message.warning('测评内容不能为空')
  } else {
    $giveReport(remarkValue.value, currentRow.value.paintingId).then(res => {
      if (res.code == 200 && res.data > 0) {
        message.success(res.message)
        getTableData()
        visibleDetail.value = false
      } else {
        message.error(res.message)
      }
    })
  }
}

onMounted(() => {
  getTableData()
})
const confirmDel = (e: MouseEvent) => {
  console.log("currentRow", currentRow.value)
  $deletePainting(currentRow.value.paintingId).then(res => {
    if (res.code === 200 && res.data > 0) {
      message.success("删除成功")
      getTableData()
    } else {
      message.error("删除失败")
    }
  })
};

const cancelDel = (e: MouseEvent) => {
  console.log(e);
};

function log(row) {
  currentRow.value = row
}
</script>

<template>
  <div class="pending-comment">
    <div class="table">
      <Table :tableState="tableState">
        <template #paintingImg="{row}">
          <img style="width: 150px;height: 150px" :src="row.paintingImg" alt=""/>
        </template>

        <template #paintingVideo="{row}">
          <video poster="/nodata.jpg" style="width: 180px;height: 180px" controls :src="row.paintingVideo">
            您的浏览器不支持 video 标签。
          </video>
        </template>
        <template #action="{row}">
          <div>
            <a-button @click="showDetail(row)" type="link">给出测评</a-button>
            <a-popconfirm
                title="确认要删除这条评测记录吗？"
                ok-text="是的"
                cancel-text="取消"
                @confirm="confirmDel"
                @cancel="cancelDel"
            >
              <a-button @click="log(row)" type="link">删除该记录</a-button>
            </a-popconfirm>
          </div>
        </template>
      </Table>
    </div>

    <a-modal @ok="handleComment" style="width: 900px;height: 800px;overflow-y: auto" v-model:open="visibleDetail"
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

      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px;padding: 5px 0">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">提问:</div>
      </div>
      <div style="padding: 2px 10px">
        <div
            style="display: flex;gap: 15px;font-weight: bold;padding: 5px 0" class="val">
          <div style="width: 80px">关于房：</div>
          <div>
            <div v-for="(item,idx) in questionArr.roomArr">
              {{ idx + 1 }}.{{ item }}
            </div>
          </div>
        </div>

        <div
            style="display: flex;gap: 15px;font-weight: bold;padding: 10px 0" class="val">
          <div style="width: 80px">关于树：</div>
          <div>
            <div v-for="(item,idx) in questionArr.treeArr">
              {{ idx + 1 }}.{{ item }}
            </div>
          </div>
        </div>

        <div
            style="display: flex;gap: 15px;font-weight: bold;padding: 10px 0" class="val">
          <div style="width: 80px">关于人：</div>
          <div>
            <div v-for="(item,idx) in questionArr.personArr">
              {{ idx + 1 }}.{{ item }}
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px;">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">学生回复:</div>
        <div>
          {{ currentRow.paintingReply }}
        </div>
      </div>

      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px;padding: 15px 0">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">测评报告:</div>
      </div>
      <a-textarea style="width: 400px;" v-model:value="remarkValue"
                  placeholder="请你结合学生画作内容，给出符合学生情况的心理测评报告" :rows="6"/>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.pending-comment {
  height: 100%;

  .table {
    height: 100%;
  }
}
</style>