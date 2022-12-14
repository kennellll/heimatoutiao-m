<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search background="#3296fa" v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()" @focus="(isResultShow = false)" />
    </form>
    <!-- 搜索结果组件 -->
    <searchResult v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索建议组件 -->
    <searchSuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
    <!-- 搜索历史组件 -->
    <searchHistory v-else :searchHistories="searchHistories" @delHistory="delHistory" @search="onSearch" @delAllHistory="delAllHistory" />

  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import { setItem, getItem } from '@/utils/storage.js'
// import { getSearchHistorys } from '@/api/serach.js'
// import { getters } from '@/store/getters.js'
export default {
  name: 'searchPage',

  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  },

  data() {
    return {
      // 搜索框内容
      searchText: '',
      // 搜索结果显示标识
      isResultShow: false,
      // 搜索历史
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },

  methods: {
    // enter搜索方法
    onSearch(text) {
      // 搜索建议的文本设置为搜索框内容
      this.searchText = text
      // 重复的搜索记录先删掉
      const ind = this.searchHistories.indexOf(text)
      if (ind !== -1) {
        this.searchHistories.splice(ind, 1)
      }

      // 记录搜索历史
      if (this.searchHistories.length >= 6) {
        this.searchHistories.splice(this.searchHistories.length - 1, 1)
      }
      this.searchHistories.unshift(text)
      // 搜索历史记录本地
      setItem('TOUTIAO_SEARCH_HISTORY', this.searchHistories)
      this.isResultShow = true
    },
    // 获取线上搜索历史的方法
    // async loadSearchHistories() {
    //   const res = await getSearchHistorys()
    //   console.log(res)
    // }
    // 删除搜索历史
    delHistory(index) {
      this.searchHistories.splice(index, 1)
      // 搜索历史记录本地
      setItem('TOUTIAO_SEARCH_HISTORY', this.searchHistories)
    },
    // 删除全部搜索历史
    delAllHistory() {
      this.searchHistories = []
      // 搜索历史记录本地
      setItem('TOUTIAO_SEARCH_HISTORY', this.searchHistories)
    }
  }

  // created() {
  //   this.loadSearchHistories()
  // }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
