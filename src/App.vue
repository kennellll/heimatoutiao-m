<template>
  <div id="app">
    <!-- 1级路由的出口 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 200px;
  height: 100px;
  background: pink;
}
</style>
