<script setup lang="ts">
import useUserLocal from "@/hooks/useUserLocal";
import {$getMyPaintingList} from "@/api/paintingApi";
import {onMounted, ref} from "vue";

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

function mapStatus(status) {
  switch (status) {
    case 1:
      return "绘画完成,待老师确认并进行提问"
    case 2:
      return "提问完成，请回复老师"
    case 3:
      return "请等待老师给出最后测评结果"
  }
}

function handleDetail(item) {
  currentPating.value = item
  detailShow.value = true
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


    <a-modal @ok="detailShow=false"
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
        <div style="color: #17c2e0" class="val">{{ currentPating.paintingQuestion || '请等待下一流程。。。' }}</div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">我的回复：</div>
        <div style="color: #17c2e0" class="val">{{ currentPating.paintingReply || '请等待下一流程。。。' }}</div>
      </div>

      <div style="display: flex;gap: 15px;font-weight: bold;font-size: 16px">
        <div style="width: 80px" class="label">测评结果：</div>
        <div style="color: #17c2e0" class="val">{{ currentPating.paintingRemark || '请等待下一流程。。。' }}</div>
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