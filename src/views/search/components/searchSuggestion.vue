<template>
  <div class="search-suggestion">
    <template v-if="suggestions.length>1">
      <van-cell icon="search" v-for="(item,index) in suggestions" :key="index" @click="$emit('search',item)">
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </template>
    <template v-else>
      <van-loading size="24px">加载中...</van-loading>
    </template>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/serach'
import { debounce } from 'lodash'
export default {
  name: 'suggesTions',

  props: {
    // 搜索框内容
    searchText: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      // 搜索建议
      suggestions: []
    }
  },

  watch: {
    searchText: {
      // 防抖处理搜索,debounce返回一个函数，借助监听器handler函数完美调用防抖函数
      handler: debounce(function (newv) {
        this.getSearchSuggestions()
      }, 1000),
      immediate: true
    }
  },

  methods: {
    // 请求搜索建议的方法
    async getSearchSuggestions() {
      const { options } = await getSearchSuggestions(this.searchText)
      this.suggestions = options
    },

    // 高亮搜索建议的方法
    highlight(str) {
      if (str === null) {
        return
      }
      // RegExp 正则表达式构造函数
      // 参数 1： 匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数 2： 匹配模式，要写到字符串中
      return str.replace(new RegExp(this.searchText, 'gi'), `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
/deep/.active {
  color: red;
}
</style>
