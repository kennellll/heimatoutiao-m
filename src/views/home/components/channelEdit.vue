<template>
  <div class="channel-edit">
    <!-- 已选频道区域-->
    <van-cell class="title-text" title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="(isEdit=!isEdit)">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item :class="['channel-item',{active:active===index}]" v-for="(value,index) in userChannelsData" :key="value.id" :text="value.name" :icon="(isEdit&&index!==0)?'clear':''" @click="onMyChannelClick(value,index)" />
    </van-grid>
    <!--频道选择区域  -->
    <van-cell class="title-text" title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="channel-item" v-for="value in recommendChannele" :key="value.id" :text="value.name" @click="onAdd(value)" />
    </van-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'channelEdit',

  props: {
    // 已选频道
    userChannels: {
      type: Array,
      require: true
    },
    // 已选频道索引
    active: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      // 所有频道
      allChannels: [],
      // 编辑状态标识
      isEdit: false,
      num: 1
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
    // 可选择频道
    recommendChannele() {
      return this.allChannels.filter(item => {
        return !this.userChannelsData.find(item1 => {
          return item1.id === item.id
        })
      })
    },
    // 转存props中已选频道数据
    userChannelsData() {
      return this.userChannels
    }
  },

  created() {
    this.loadAllChannels()
  },

  methods: {
    // 请求所有频道数据的方法
    async loadAllChannels() {
      const res = await getAllChannels()
      this.allChannels = res.channels
    },

    // 添加频道的方法
    async onAdd(value) {
      try {
        this.userChannelsData.push(value)
        if (this.userInfo && this.userInfo.token) {
          // 已登录的,添加频道保存在后端
          await addUserChannel([{ id: value.id, seq: this.userChannelsData.length }])
        } else {
          // 未登录的,添加频道保存在本地
          setItem('channels', this.userChannelsData)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 编辑的方法
    onMyChannelClick(value, index) {
      if (this.isEdit && index !== 0) {
        // 删除频道操作
        this.deleteChannel(value, index)
      } else {
        // 跳转频道操作
        this.switchChannel(index)
      }
    },

    // 删除频道的方法
    async deleteChannel(value, index) {
      // 当删除已选频道之前的频道时，已选频道也跟着变化
      if (index <= this.active) {
        // this.$emit('reviseIndex', this.active - 1)
        this.$emit('update:active', this.active - 1)
      }
      // 删弹层的频道
      this.userChannelsData.splice(index, 1)
      if (this.userInfo && this.userInfo.token) {
        await deleteUserChannel(value.id).catch(error => {
          console.log(error)
        })
        // 已登录的,删除频道保存在后端
      } else {
        // 未登录的,删除频道保存在本地
        setItem('channels', this.userChannelsData)
      }
    },

    // 跳转频道方法
    switchChannel(index) {
      // 关闭弹出层,并且回传对应频道ID
      this.$emit('jumpChannel', index)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .title-text {
    font-size: 16px;
    color: #333333;
  }
  .channel-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 10px;
        margin-top: 0;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: -10px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  /deep/.active {
    .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
