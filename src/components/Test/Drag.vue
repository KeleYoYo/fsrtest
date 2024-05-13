<script setup lang="ts">
import draggable from 'vuedraggable'
import {ref} from "vue";

const list = ref([
  {name: "www.itxst.com", id: 0},
  {name: "www.baidu.com", id: 1},
  {name: "www.google.com", id: 2},
])

//开始拖拽事件
function onStart() {

}

//结束拖拽事件
function onEnd() {
  console.log("drag-end", list.value)
}

</script>

<template>
  <div>
    <draggable :list="list" ghost-class="ghost" :force-fallback="true" chosen-class="chosenClass" animation="300"
               @start="onStart" @end="onEnd">
      <template #item="{ element }">
        <div class="item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.itxst {
  width: 600px;
  display: flex;
}

.itxst > div:nth-of-type(1) {
  flex: 1;
}

.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}

.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}

.item + .item {
  margin-top: 10px;
}

.ghost {
  border: solid 1px rgb(19, 41, 239) !important;
}

.chosenClass {
  background-color: #eee;
  opacity: 1;
  border: solid 1px red;
}

.fallbackClass {
  background-color: aquamarine;
}
</style>