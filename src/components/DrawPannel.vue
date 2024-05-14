<template>
  <div class="draw">
    <canvas :style="{'--bg':panelBgColor}" :class="`${isEraser?'eraser':''}`" id="draw-panel">
    </canvas>
    <div class="tools">
      <div class="colors">

      </div>
      <div :class=" `colors-panel ${colorPanel}`">
        <li @click="handlePencilColor(color)" :style="{'--color':color.value}" class="color-item"
            v-for="color in colors">
        </li>
      </div>
      <div class="tool-items">
        <li :class="`${currentToolIdx == idx ? 'active' : ''}`" @click="tool.clickFn" v-for="(tool,idx) in toolItem">
          {{ tool.label }}
        </li>
      </div>
    </div>

    <a-modal @ok="upLoadPainting" okText="确认上传" cancelText="暂不上传" v-model:open="upLoadModalShow"
             title="上传绘画记录 ">
      <div class="tip">
        <div style="padding: 10px" v-for="tip in tips">
          {{ tip }}
        </div>
        <div style="color: red;font-weight: bold">
          1.现在请对你的绘画过程进行自我描述
        </div>
        <CommonForm ref="formRef" :style="{'color':'black','background-color':'white','padding':'20px'}"
                    :form-config="formConfig">
        </CommonForm>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
// 初始化canvas画板
import drawconfig from './formConfig/drawconfig.ts'
import {onMounted, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";
import CommonForm from "@/components/CommonForm.vue";
import useForm from "@/hooks/useForm";
import useUserLocal from "@/hooks/useUserLocal";
import {$firstCommit} from "@/api/paintingApi.ts";

const {userInfo, isLogin} = useUserLocal()
const {formConfig} = useForm(drawconfig)
const formRef = ref(null)

const upLoadModalShow = ref(false)
const tips = ref([
  "同学你好，欢迎你上传你的绘画作品，请你注意以下几点 ：",
  "1.上传作品之前需要你对自己的绘画过程进行简要的描述（重点可以是绘画心境，情绪等方面）",
  "2.完成作品和自我描述后，点击上传按钮，等待老师对你的提问，老师讲根据你的自我描述和你的回复来对你进行指导",
  "4.回复完成后，老师讲对你做出指导",
  "5.上传作品后，后续的过程可在个人空间中进行",
])
const upLoadPainting = () => {
  if (!isLogin) {
    message.error("同学，提交绘画作品前，请先登录")
    return
  }
  formRef.value.onValidate(() => {
    // 获取canvas元素
    let canvas = document.getElementById('draw-panel');
    let base64Image = canvas.toDataURL('image/png');
    let data = {
      authorId: userInfo.userId,
      paintingTime: '1小时30分钟',
      selfAssessment: formConfig.value.formState.selfAssessment,
      paintingStatus: 1,
      paintingImg: base64Image
    }
    $firstCommit(data).then(res => {
      console.log("paintingres", res)
      if (res.data >= 1) {
        message.success("提交成功，可在个人空间中查看记录")
        upLoadModalShow.value = false
      } else {
        message.warn("服务器出现错误，请稍后再试")
      }
    })
    //   调取接口上传绘画历程
  }, () => {
    message.warn("同学，请先完成绘画过程的自我测评")
  })
}

const colorPanel = ref("hide")
// 画板颜色
const panelBgColor = ref("#fff")

// 默认选中画笔
const currentToolIdx = ref(1)

const canvasCTX = ref(null)
var startPoint = {
  x: -999,
  y: -999
}
var action = "pencil"
const isEraser = ref(false);
const downloadLink = ref(null)
const pencilColor = ref("#0d0e0d")
const colors = ref([
  {label: '红色', value: '#FF0000'},
  {label: '蓝色', value: '#1b3c8d'},
  {label: '黄色', value: '#eac42a'},
  {label: '绿色', value: '#0cee2a'},
  {label: '黑色', value: '#0d0e0d'}
])
// 选择画笔颜色
const handlePencilColor = (coloritem) => {
  if (action == 'bgColor') {
    panelBgColor.value = coloritem.value
  }
  if (action == 'pencilColor') {
    pencilColor.value = coloritem.value
    console.log("画笔颜色", pencilColor.value)
  }
}


// 点击颜色板
const colorClick = () => {
  currentToolIdx.value = 0
  if (action == 'bgColor') {
    colorPanel.value = 'hide'
  }
  if (colorPanel.value === "show") {
    colorPanel.value = 'hide'
  } else {
    colorPanel.value = 'show'
  }
  action = 'pencilColor'
  colors.value = [
    {label: '红色', value: '#FF0000'},
    {label: '蓝色', value: '#1b3c8d'},
    {label: '黄色', value: '#eac42a'},
    {label: '绿色', value: '#0cee2a'},
    {label: '黑色', value: '#0d0e0d'}
  ]
}
// 点击画笔
const pencilClick = () => {
  currentToolIdx.value = 1
  action = 'pencil'
  isEraser.value = false
}
const cleanCanvas = () => {
  currentToolIdx.value = 3
  let canvas = document.querySelector("#draw-panel")
  // console.log("canvasCTX", canvasCTX)
  canvasCTX.value.fillStyle = panelBgColor.value;
  canvasCTX.value.fillRect(0, 0, canvas.width, canvas.height);
}
/**
 * 表设计：
 * 1.user表 - user_id,user_name,user_pwd,user_phone,user_address,user_age,user_sex,user_email
 * 2.painting_records(绘画记录表),painting_id,painting_question(老师提问),painting_reply(学生回复),painting_remark(老师给出评语)
 * painting_status(绘画状态，1是绘画完成，完成作者自评。2是完成老师提问，3是学生回复完成，4是绘画测评结束，老师给出评语)
 * painting_img,painting_time,author_id,self_assessment(作者自评)
 * 3.consultation（咨询表）,consultation_id,consultation_question(问题内容),consultation_time（咨询时间）,author_id(咨询人id)
 * reply(回复内容)，replier_id(回复人id),consultation_status(咨询状态，1是咨询完成，2是咨询回复完成)
 * 4.article（文章表）,article_id,article_title,article_content,article_time,category_id(文章分类id)
 * article_author_id(作者id),article_status(文章状态，1是文章完成，2是文章审核中，3是文章审核通过，4是文章审核不通过)
 * 5.category（分类表）,category_id,category_name
 * */

// 下载
const download = () => {
  currentToolIdx.value = 4
  try {
    downloadLink.value.click()
  } catch (e) {
    message.error("下载失败了")
  }
}
const panBgcolor = () => {
  currentToolIdx.value = 5
  if (action == 'pencilColor') {
    colorPanel.value = 'hide'
  }
  if (colorPanel.value === "show") {
    colorPanel.value = 'hide'
  } else {
    colorPanel.value = 'show'
  }
  action = 'bgColor'
  colors.value = [
    {label: 'x', value: '#e3c0c0'},
    {label: 'x', value: '#eee3e8'},
    {label: 'x', value: '#d9cc99'},
    {label: 'x', value: '#5aef6e'},
    {label: 'x', value: '#0d0e0d'}
  ]
}


const eraserFn = () => {
  currentToolIdx.value = 2
  action = 'eraser'
  isEraser.value = true
}
const paintingUp = () => {
  currentToolIdx.value = 6
  action = 'paintingUp'
  upLoadModalShow.value = true
}
const toolItem = ref([
  {label: "画笔颜色", action: "colorPike", clickFn: colorClick},
  {label: "画笔", action: "pencil", clickFn: pencilClick},
  {label: "橡皮擦", action: "eraser", clickFn: eraserFn},
  {label: "清除", action: "delete", clickFn: cleanCanvas},
  {label: "下载", action: "download", clickFn: download},
  {label: "画板颜色", action: "colorPike", clickFn: panBgcolor},
  {label: "上传绘画", action: "paintingUp", clickFn: paintingUp},
])


const initCanvas = () => {
  let canvas = document.querySelector("#draw-panel")
  canvas.width = document.documentElement.offsetWidth;
  canvas.height = document.documentElement.offsetHeight;
  canvasCTX.value = canvas.getContext('2d')
}
// 允许下载为图片
const enableDownload = (ctx) => {
  // 创建 a 元素
  const link = document.createElement("a");
  link.href = ctx.toDataURL();
  link.download = "draw"

  // 出于浏览器同源策略，通常不允许通过点击事件将顶层框架导航到"data"类型的URL。这是为了防止滥用和潜在的安全风险。
  // "data"类型的URL包含数据的直接内容，而不是指向实际资源的链接。因此，如果浏览器允许顶层框架通过点击事件导航到"data"类型的URL，
  // 那么恶意用户可以通过构造特定的URL来加载恶意代码并执行。
  // 如果您仍然希望在点击事件中导航到指定URL，建议使用window.open()方法来打开一个新的窗口或标签页，并将"data"类型的URL作为参数传递给它。
  // 添加了target属性来指定在新的窗口或标签页中打开。
  link.target = "_blank";
  downloadLink.value = link
}
const drawLine = ({startX, startY, endX, endY}) => {
  console.log("绘制", canvasCTX.value)
  //开始绘制
  canvasCTX.value.beginPath();
  //线宽
  canvasCTX.value.lineWidth = 2;
  console.log("线条颜色", pencilColor.value)
  // 线颜色
  canvasCTX.value.strokeStyle = pencilColor.value;
  // 指定如何绘制每一条线段末端的属性,round-线段末端以圆形结束。
  canvasCTX.value.lineCap = 'round';
  //起始位置
  canvasCTX.value.moveTo(startX, startY);
  //停止位置
  canvasCTX.value.lineTo(endX, endY);
  //描绘线路
  canvasCTX.value.stroke();
  //结束绘制
  canvasCTX.value.closePath();
}

// 画板监听鼠标按下
const watchCanvas = (ctx) => {
  console.log("绘制", ctx)
  // 1. mousedown 确定起始坐标，准备绘制
  ctx.addEventListener('mousedown', function (event) {
    startPoint.x = event.offsetX;
    startPoint.y = event.offsetY;
    console.log("鼠标在canvas画布上按下-startPos", startPoint)
  });
  // 画板监听鼠标移动，绘制图形 or 擦除)
  ctx.addEventListener('mousemove', function (event) {
    const endX = event.offsetX;
    const endY = event.offsetY;

    if (action === 'pencil' && startPoint.x >= 0) {
      console.log("画笔")
      drawLine({
        startX: startPoint.x,
        startY: startPoint.y,
        endX,
        endY
      })
      startPoint = {
        x: endX,
        y: endY
      }
    }
    if (action === 'eraser' && startPoint.x >= 0) {
      console.log("橡皮擦")
      canvasCTX.value.clearRect(endX - 5, endY - 5, 25, 25);
    }
  });
  // 监听鼠标抬起， 结束绘制
  ctx.addEventListener('mouseup', function () {
    console.log("鼠标抬起")
    startPoint = {
      x: -999,
      y: -999
    }
    enableDownload(ctx);
  });
}
watchEffect(() => {
  if (canvasCTX.value) {
    watchCanvas(canvasCTX.value.canvas)
  }
})
onMounted(() => {
  initCanvas()
})
</script>

<style lang="scss" scoped>
.draw {
  //background-color: yellow;
  width: 100%;
  height: 800px;
}

/*canvas画板*/
#draw-panel, .tools {
  position: absolute;
}

#draw-panel {
  background: var(--bg);
  cursor: url('/src/static/img/pencli.svg'), auto;
}

#draw-panel.eraser {
  cursor: url('/src/static/img/eraser.svg'), auto;
}

.tools {
  min-width: 80px;
  width: fit-content;
  height: 400px;
  background-color: yellow;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}

/*颜色板*/
@keyframes colors-panel-show {
  from {
    left: 0;
    opacity: 0;
  }
  to {
    left: 100%;
    opacity: 1;
  }
}

@keyframes colors-panel-hide {
  from {
    left: 100%;
    opacity: 1;
  }
  to {
    left: 0;
    opacity: 0;
  }
}

.tools .colors-panel {
  width: 60px;
  height: 100%;
  background-color: white;
  left: 0%;
  z-index: 9;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.tools .colors-panel li {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color);
}

.show {
  animation: colors-panel-show 0.5s linear forwards;
}

.hide {
  animation: colors-panel-hide 0.5s linear forwards;
}

/*工具选项*/
.tools .tool-items {
  background-color: #b2b2e1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 99;
  font-weight: bold;

}

.tool-items .active {
  color: #17ec1b;
}

li {
  list-style-type: none;
  cursor: pointer;
}

.selected {
  color: blue;
}
</style>