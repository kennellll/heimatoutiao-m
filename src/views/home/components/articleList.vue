<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="数据已全部加载" @load="onLoad">
        <!-- 文章item组件 -->
        <myArticleItem v-for="item in articles" :key="item.art_id" :article="item" @click.native="$router.push({name:'article',params:{
          articleId:item.art_id
        }})" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import myArticleItem from '@/components/myArticleItem'

export default {
  name: 'articleList',

  components: {
    myArticleItem
  },

  props: {
    // 频道信息
    channel: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      // 文章列表数据
      articles: [],
      // 上拉加载状态
      loading: false,
      // 加载完毕的标识
      finished: false,
      // 下一页时间戳
      timestamp: null,
      // 下拉刷新状态
      isRefreshLoading: false,
      // 下拉刷新成功的提示
      refreshSuccessText: '刷新成功'
    }
  },

  methods: {
    // 上拉加载的方法,初始化会自动执行一次
    async onLoad() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      this.articles = [...this.articles, ...res.results]
      // 上拉加载状态每次数据回来必须设置为false
      this.loading = false

      if (res.results.length > 0) {
        // 继续加载下一页
        this.timestamp = res.pre_timestamp
      } else {
        // 已全部加载设置为true
        this.finished = true
      }
    },
    // 下拉刷新的方法
    async onRefresh() {
      // 前面追加数据
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.articles.unshift(...res.results)
      // 下拉刷新状态每次数据回来必须设置为false
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新${res.results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
