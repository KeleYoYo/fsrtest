<template>
  <div class="flex common-table">
    <div id="common-table-loading" ></div>
    <vxe-grid v-bind="props.GridOptions">
      <template v-for="item in props.GridOptions.columns" #[item?.slots?.default]="{row}">
        <slot :name="item.slots.default" :row="row"></slot>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  GridOptions:{
    type:Object,
    default:()=>{}
  }
});

</script>

<style scoped lang="scss">
.common-table::v-deep{
  position: relative;
  .vxe-header--row{
    background-color: pink;
    color: yellow;
    .vxe-cell--checkbox{
      border-radius: 999px;
      span{
        background-color: rebeccapurple;
      }
    }
  }
  #common-table-loading{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


</style>