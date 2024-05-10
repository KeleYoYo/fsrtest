<script setup lang="ts">
import {ref} from "vue";
import {tableConfig} from "@/views/tableTest/tableConfig";
import useTableList from "@/hooks/useTableList";
const re  = ref(null)
const {GridOptions} =useTableList(tableConfig)
console.log("GridOptions",GridOptions)
</script>

<template>
  <div style="height: 100%">
    <VxeGrid v-bind="GridOptions" ref="re">
      <template #date="{row}">
        {{row.date}} +111
      </template>
    </VxeGrid>
  </div>
</template>

<style lang="less" scoped>
//表头样式
:deep(.vxe-table--header){
  background-color: yellow;
}
//行样式
:deep(.vxe-body--row){
  background-color: green;
  color: white;
  font-weight: bold;
  border-top: 1px solid red;
  margin-top: 15px;
}
//鼠标移入行样式
:deep(.vxe-body--row.row--hover){
  background-color: black;
  color: white;
  font-weight: bold;
}

</style>