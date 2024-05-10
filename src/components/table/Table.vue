<script setup lang="ts">
const props = defineProps({

  // 表格状态对象
  tableState: {
    type: Object,
    default:()=>{
      return {}
    }
  }
})

</script>

<template>
  <VxeGrid  v-bind="props.tableState.gridOptions" ref="re">
    <template v-for="item in props.tableState.gridOptions.columns" #[item?.slots?.default]="{row}">
      <!--default动态插槽-->
      <slot :name="item.slots.default" :row="row"></slot>
    </template>
  </VxeGrid>
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