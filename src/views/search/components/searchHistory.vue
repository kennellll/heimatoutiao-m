<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="delAllHistory">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow=true" />
    </van-cell>
    <!-- 历史记录 -->
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="item" @click="onSearchItemClick(item,index)">
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',

  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },

  data() {
    return {
      // 删除的状态标识
      isDeleteShow: false
    }
  },

  methods: {
    // 删除单个搜索历史的方法
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 通知父组件删对应历史
        return this.$emit('delHistory', index)
      }
      // 非删除操作则进行搜索操作
      this.$emit('search', item)
    },
    // 删除全部搜索历史的方法
    delAllHistory() {
      this.$emit('delAllHistory', [])
    }
  }
}
</script>

<style scoped lang="less">
</style>
