<template>
  <div class="home-container">
    <!-- 顶部导航栏组件 -->
    <myNav>
      <template #title>
        <van-button class="search-btn" icon="search" type="info" round size="small" to="/search">搜索</van-button>
      </template>
    </myNav>

    <!-- 频道组件 -->
    <myTab />
  </div>
</template>

<script>
import myNav from '@/components/myNav'
import myTab from './components/myTab'
export default {
  name: 'homePage',
  components: {
    myNav,
    myTab
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
