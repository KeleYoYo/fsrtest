<script setup lang="ts">
import {paintingList} from "@/views/admin/studentPainting/tableConfig/paintingList";
import useTableList from "@/hooks/useTableList";
import {$deletePainting, $getPaintingList} from "@/api/paintingApi";
import {computed, onMounted, ref} from "vue";
import {returnQuestionArr} from "@/utils/questionUtils";
import {message} from "ant-design-vue";

const {tableState} = useTableList(paintingList)

const remarkValue = ref('')

const currentRow = ref({})

const visibleDetail = ref(false)

function getTableData() {
  $getPaintingList(0).then(res => {
    console.log("res", res)
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
  visibleDetail.value = false
}

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
onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="pending-comment">
    <div class="table">
      <Table :tableState="tableState">
        <template #paintingImg="{row}">
          <img style="width: 150px;height: 150px" :src="row.paintingImg" alt=""/>
        </template>
        <template #paintingStatus="{row}">
          <span style="color: #ea6f08" v-show="row.paintingStatus == 1">待老师提问</span>
          <span style="color: #36ecdd" v-show="row.paintingStatus == 2">待学生回复问题</span>
          <span style="color: #f30558" v-show="row.paintingStatus == 3">待老师给出测评报告</span>
          <span style="color: #31f114" v-show="row.paintingStatus == 4">已完成测评</span>
        </template>

        <template #paintingVideo="{row}">
          <video poster="/nodata.jpg" style="width: 180px;height: 180px" controls :src="row.paintingVideo">
            您的浏览器不支持 video 标签。
          </video>
        </template>

        <template #action="{row}">
          <div>
            <a-button @click="showDetail(row)" type="link">查看详情</a-button>

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
        <span v-if="!currentRow.paintingQuestion">暂无提问</span>
      </div>
      <div v-if="currentRow.paintingQuestion" style="padding: 2px 10px">
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
          {{ currentRow.paintingReply || '暂无回复' }}
        </div>
      </div>

      <div style="display: flex;gap: 15px;align-items: center;font-size: 16px;padding: 15px 0">
        <div style="font-weight: bold;color: #17c2e0;width: 80px">测评报告:</div>
        {{ currentRow.paintingRemark || '暂未生成测评报告' }}
      </div>
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