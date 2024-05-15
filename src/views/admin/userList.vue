<script setup lang="ts">

import {userList} from './tableConfig/userList.ts'
import useTableList from "@/hooks/useTableList";
import {onMounted} from "vue";
import {$getUserList} from "@/api/userApi";

const {tableState} = useTableList(userList)


function getTableData() {
  $getUserList().then(res => {
    console.log("users", res)
    tableState.gridOptions.data = res.data
  })
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="pending-comment">
    <div class="table">
      <Table :tableState="tableState">
        <template #userAge="{row}">
          {{ row.userAge }}
        </template>
        <template #userRole="{row}">
          <span v-if="row.userRole == 0">学生</span>
          <span v-if="row.userRole == 1">老师</span>
          <span v-if="row.userRole == 2">管理员</span>
        </template>
      </Table>
    </div>
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