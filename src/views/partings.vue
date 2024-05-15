<script setup lang="ts">
import useUserLocal from "@/hooks/useUserLocal";
import {$getMyPaintingList, $replyTeacher} from "@/api/paintingApi";
import {computed, onMounted, ref} from "vue";
import {returnQuestionArr} from '@/utils/questionUtils.js'
import {message} from "ant-design-vue";

const replyValue = ref("")

const {userInfo} = useUserLocal()
const paintingList = ref([])
const currentPating = ref({})
const detailShow = ref(false)

function getMyPartings() {
  $getMyPaintingList(userInfo.userId).then(res => {
    console.log("$getMyPaintingList:res", res)
    if (res.code === 200 && res.data.length > 0) {
      paintingList.value = res.data
    }
  })
}

const questionArr = computed(() => {
  let data = returnQuestionArr(currentPating.value.paintingQuestion)
  console.log("data", data)
  return data
})

function mapStatus(status) {
  switch (status) {
    case 1:
      return "绘画完成,待老师确认并进行提问"
    case 2:
      return "提问完成，请回复老师"
    case 3:
      return "请等待老师给出最后测评结果"
    case 4:
      return "本次测评已完成，请查看你的测评记录结果"
  }
}

function handleDetail(item) {
  currentPating.value = item
  detailShow.value = true
}

// update painting_records set painting_reply = #{paintingReply},painting_status = 3
// 学生回复老师问题
function handleReply() {
  console.log("replyValue.value", replyValue.value)
  $replyTeacher(replyValue.value).then(res => {
    if (res.code === 200 && res.data >= 1) {
      message.success("回复成功，请耐心等待老师给出最终结果")
    } else {
      message.error("服务器出问题了，回复失败，请稍后再试")
    }
  })
  detailShow.value = false
}

onMounted(() => {
  getMyPartings()
})
</script>

<template>
  <div class="pating-container">
    <div
        @click="handleDetail(item)"
        v-for="(item,index) in paintingList" class="item card swing-zoom">
      <img :src="item.paintingImg"/>
    </div>


    <a-modal @ok="handleReply"
             style="height: 800px;width:800px;display:flex;flex-direction:column;align-items:center;overflow-y: auto"
             v-model:open="detailShow"
    >
      <div style="padding: 10px;color: #17ec1b;font-weight: bold;font-size: 16px">
        绘画记录状态：{{ mapStatus(currentPating.paintingStatus) }}
      </div>
      <div style="width: 600px;height: 400px">
        <img style="width: 100%;height: 100%" :src="currentPating.paintingImg"/>
      </div>
      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">绘画时长：</div>
        <div style="color: #17c2e0" class="val">{{ currentPating.paintingTime }}</div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">学生自评：</div>
        <div style="color: #17c2e0" class="val">{{ currentPating.selfAssessment }}</div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">老师提问：</div>
        <div v-if="currentPating.paintingStatus <= 1" style="color: #17c2e0" class="val">{{ '请等待下一流程。。。' }}</div>
      </div>
      <!--      房-->
      <div v-if="currentPating.paintingStatus >= 2"
           style="color: #17c2e0;display: flex;gap: 15px;font-weight: bold;padding: 5px 0" class="val">
        <div style="width: 80px">关于房：</div>
        <div>
          <div v-for="(item,idx) in questionArr.roomArr">
            {{ idx + 1 }}.{{ item }}
          </div>
        </div>
      </div>

      <div v-if="currentPating.paintingStatus >= 2"
           style="color: #17c2e0;display: flex;gap: 15px;font-weight: bold;padding: 10px 0" class="val">
        <div style="width: 80px">关于树：</div>
        <div>
          <div v-for="(item,idx) in questionArr.treeArr">
            {{ idx + 1 }}.{{ item }}
          </div>
        </div>
      </div>

      <div v-if="currentPating.paintingStatus >= 2"
           style="color: #17c2e0;display: flex;gap: 15px;font-weight: bold;padding: 10px 0" class="val">
        <div style="width: 80px">关于人：</div>
        <div>
          <div v-for="(item,idx) in questionArr.personArr">
            {{ idx + 1 }}.{{ item }}
          </div>
        </div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">我的回复：</div>
        <div v-if="currentPating.paintingStatus < 2" style="color: #17c2e0" class="val">请等待下一流程。。。</div>
        <div v-if="currentPating.paintingStatus <= 2 && currentPating.paintingStatus < 3" style="color: #17c2e0"
             class="val">
          <a-textarea style="width: 270px;" v-model:value="replyValue" placeholder="请回答老师提出的问题" :rows="4"/>
        </div>
        <div v-if="currentPating.paintingStatus >= 3" style="color: #17c2e0" class="val">
          {{ currentPating.paintingReply }}
        </div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">测评结果：</div>
        <div v-if="currentPating.paintingStatus <= 3" style="color: #17c2e0" class="val">请等待下一流程。。。</div>
        <div v-if="currentPating.paintingStatus >= 4" style="color: #17c2e0" class="val">
          老师给出的测评结果
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.pating-container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .item {
    width: 200px;
    height: 200px;
    background: #dad0d0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

}
</style>