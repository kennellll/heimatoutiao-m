<template>
  <div>
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 频道列表组件 -->
        <articleList :channel="item" />
      </van-tab>
      <!-- 频道占位按钮 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 编辑按钮 -->
      <div slot="nav-right" class="wap-nav-warp" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" class="nav-icon" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="isChannelEditShow" closeable position="bottom" style="height:100%" close-icon-position="top-left" get-container="body">
      <!--内容组件  -->
      <channelEdit :userChannels="channels" @jumpChannel="jumpChannel" :active.sync="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './articleList'
import channelEdit from './channelEdit'
import { getItem } from '@/utils/storage.js'
import { mapGetters } from 'vuex'
export default {
  name: 'myTab',

  components: {
    articleList,
    channelEdit
  },

  data() {
    return {
      // 选中标签索引
      active: 0,
      // 频道列表
      channels: [],
      // 弹出层显示状态
      isChannelEditShow: false
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  created() {
    this.loadChannels()
  },

  methods: {
    // 请求用户频道的方法
    async loadChannels() {
      if (this.userInfo && this.userInfo.token) {
        // 已登录，需请求后端获取最新频道
        const { channels } = await getUserChannels()
        this.channels = channels
      } else {
        // 没登录，如果本地有存频道数据则直接用本地
        if (getItem('channels')) {
          this.channels = getItem('channels')
        } else {
          // 没登录，本地没存频道数据则请求默认频道
          const { channels } = await getUserChannels()
          this.channels = channels
        }
      }
    },
    // 跳转频道的自定义事件方法
    jumpChannel(index) {
      // 关闭弹出层,并且选中对应频道
      this.isChannelEditShow = false
      this.active = index
    }
    // 删除频道的自定义事件方法
    // reviseIndex(index) {
    //   this.active = index
    // }
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
  .placeholder {
    flex-shrink: 0;
    width: 25px;
  }

  .wap-nav-warp {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 43px;
    background-color: #fff;
    opacity: 0.9;

    .nav-icon {
      font-size: 24px;
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 43px;
      background: url(@/assets/gradient-gray-line.png) no-repeat;
      background-size: contain;
    }
  }
}
</style>
