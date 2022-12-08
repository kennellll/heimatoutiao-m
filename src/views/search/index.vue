<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/">
      <van-search background="#3296fa" v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()" @focus="(isResultShow = false)" />
    </form>
    <!-- 搜索结果组件 -->
    <searchResult v-if="isResultShow" />
    <!-- 搜索建议组件 -->
    <searchSuggestion v-else-if="searchText" />
    <!-- 搜索历史组件 -->
    <searchHistory v-else />

  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
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
      isResultShow: false
    }
  },

  methods: {
    // enter搜索方法
    onSearch() {
      this.isResultShow = true
    }
  }
}
</script>

<style>
</style>
