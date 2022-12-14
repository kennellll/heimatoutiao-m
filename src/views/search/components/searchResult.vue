<template>
  <div class="search-result">
    <van-list offset="50" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" :to="{name:'article',params:{
          articleId:item.art_id
        }}" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/serach'
export default {
  name: 'searchResult',

  props: {
    // 搜索框内容
    searchText: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // 页码
      page: 1,
      perPage: 20
    }
  },

  methods: {
    // 上拉加载的方法
    async onLoad() {
      const { results } = await getSearchResult({ page: this.page, per_page: this.perPage, q: this.searchText })
      this.list.push(...results)
      // 每次加载完手动关闭
      this.loading = false
      // 判断条件是否符合下次加载
      if (results.length > 0) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.search-result {
  .van-list {
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
