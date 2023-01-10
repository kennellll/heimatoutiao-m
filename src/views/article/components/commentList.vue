<template>
  <div class="article-comments">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="50">
      <commentItem v-for="item in commentsList" :key="item.com_id
" :comment="comment" />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import commentItem from '@/views/article/components/commentItem.vue'
export default {
  name: 'commentList',

  components: {
    commentItem
  },

  props: {
    // 文章ID
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },

  data() {
    return {
      // 评论列表
      commentsList: [],
      // 加载状态标识
      loading: false,
      // 加载完成标识
      finished: false,
      // 请求下一页数据的页码
      offset: null,
      // 总数据条数
      totalCount: 0
    }
  },

  methods: {
    // 上拉加载评论列表
    async onLoad() {
      const res = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10
      })
      console.log(res)
      this.commentsList.push(...res.results)
      this.totalCount = res.total_count
      this.loading = false
      if (res.results.length <= 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
