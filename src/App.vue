<script setup lang="ts">
</script>

<template>
  <div id="decode-app">
<!--    <a-button type="primary">项目启动</a-button>-->
    <TabBar></TabBar>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" >
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,html,#app{
  width: 100vw;
  height: 100vh;
}
#decode-app{
  width: 100%;
  height: 100%;
  //background-color: yellow;
  background: black;
  .main {
    height: 100%;
    padding: 120px 20px 0 20px;
  }
}
</style>
