<template>
  <van-tabs class="channel-tabs" v-model="active">
    <van-tab v-for="item in channels" :key="item.id" :title="item.name">
      <!-- 频道列表组件 -->
      <articleList :channel="item" />
    </van-tab>
  </van-tabs>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './articleList'
export default {
  name: 'myTab',

  components: {
    articleList
  },

  data() {
    return {
      // 选中标签索引
      active: 0,
      // 频道列表
      channels: []
    }
  },

  created() {
    this.loadChannels()
  },

  methods: {
    // 请求用户频道的方法
    async loadChannels() {
      const { channels } = await getUserChannels()
      this.channels = channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    width: 15px !important;
    background-color: #3296fa;
    bottom: 20px;
  }
}
</style>
