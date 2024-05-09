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

<style scoped>

</style>