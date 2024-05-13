<template>
  <div :style="{'--bg':panelBgColor}" class="draw">
    <canvas id="draw-panel">
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
        <li @click="tool.clickFn" v-for="tool in toolItem">
          {{ tool.label }}
        </li>
      </div>
    </div>
  </div>
</template>

<script setup>
// 初始化canvas画板
import {onMounted, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";

const colorPanel = ref("hide")
// 画板颜色
const panelBgColor = ref("#fff")

const canvasCTX = ref(null)
var startPoint = {
  x: -999,
  y: -999
}
var action = "pencil"
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
  action = 'pencil'
}
const cleanCanvas = () => {
  let canvas = document.querySelector("#draw-panel")
  // console.log("canvasCTX", canvasCTX)
  canvasCTX.value.fillStyle = panelBgColor.value;
  canvasCTX.value.fillRect(0, 0, canvas.width, canvas.height);
}
// 下载
const download = () => {
  try {
    downloadLink.value.click()
  } catch (e) {
    message.error("下载失败了")
  }
}
const panBgcolor = () => {
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
const toolItem = ref([
  {label: "画笔颜色", action: "colorPike", clickFn: colorClick},
  {label: "画笔", action: "pencil", clickFn: pencilClick},
  {label: "橡皮擦", action: "eraser", clickFn: null},
  {label: "清除", action: "delete", clickFn: cleanCanvas},
  {label: "下载", action: "download", clickFn: download},
  {label: "画板颜色", action: "colorPike", clickFn: panBgcolor},
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
      canvasCTX.current.clearRect(endX - 5, endY - 5, 25, 25);
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

}

li {
  list-style-type: none;
  cursor: pointer;
}

.selected {
  color: blue;
}
</style>