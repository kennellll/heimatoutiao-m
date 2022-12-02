<template>
  <div class="layout-container">
    <!-- 二级界面出口 -->
    <router-view/>
    <!-- 顶部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item :to="{name:'home'}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to='/video' icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to='/my' icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      // 选中的导航栏索引
      active: 0
    }
  }
}
</script>

<style>

</style>
