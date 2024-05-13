<script setup lang="ts">
import {ref} from "vue";
import {tableConfig} from "@/views/tableTest/tableConfig";
import useTableList from "@/hooks/useTableList";

const re  = ref(null)
const {tableState} =useTableList(tableConfig)
console.log("GridOptions",tableState)
</script>
<template>
  <div style="height: 100%">
    <!--    <Drag></Drag>-->
    <div style="height: 50%">
      <Table :tableState="tableState">
        <template #date="{row}">
          {{ row.date }} +111
        </template>
      </Table>
    </div>
    <div style="height: 50%">
      <TableTwo :tableState="tableState">
        <template #date="{row}">
          {{ row.date }} +111
        </template>
      </TableTwo>
    </div>
  </div>
</template>

<style lang="less" scoped>


</style>