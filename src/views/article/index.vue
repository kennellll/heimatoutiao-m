<template>
  <div class="article-container">
    <!-- 顶部标题栏 -->
    <myNav showArrow>
      <div slot="title">黑马头条</div>
    </myNav>
    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{article.title}}</h1>
      <!-- 作者信息 -->
      <van-cell class="user-info" center :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
        <div slot="title" class="name">{{article.aut_name}}</div>
        <div slot="label" class="publish-date">{{article.pubdate|relativeTime}}</div>
        <van-button class="follow-btn" :loading="isFollowLoading" :type="article.is_followed?'default':'info'" color="#3296fa" round size="small" :icon="article.is_followed?'':'plus'" @click="onFollow">{{article.is_followed?'已关注':'关注'}}</van-button>
      </van-cell>
      <!-- 文章内容 -->
      <div class="article-content markdown-body" ref="article-content" v-html="article.content">
      </div>
      <!-- 评论列表 -->
      <commentList :articleId="articleId" />
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon :color="article.is_collected?'orange':'#777'" :name="article.is_collected?'star':'star-o'" @click="onCollect" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import myNav from '@/components/myNav'
import commentList from './components/commentList'
// import { ImagePreview } from 'vant'
import { getArticleById, addCollect, deleteCollect } from '@/api/article.js'
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'articlePage',

  components: {
    myNav,
    commentList
  },

  data() {
    return {
      // 文章详情
      article: {},
      // 关注按钮的加载效果标识
      isFollowLoading: false
    }
  },

  props: {
    // 文章ID
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },

  created() {
    this.loadArticle()
  },

  mounted() {
    const articleDom = this.$refs['article-content']

    this.previewImage(articleDom)
  },

  methods: {
    // 请求文章内容的方法
    async loadArticle() {
      const res = await getArticleById(this.articleId)
      this.article = res
    },

    // 预览图片的方法
    previewImage(articleDom) {
      // const imgs = articleDom.getElementsByTagName('img')
      // const images = []
      // 给每个照片绑定点击事件
      // imgs.forEach((item, index) => {
      //   images.push(item.src)
      //   item.onclick = () => {
      //     ImagePreview({
      //       images: images,
      //       startPosition: index
      //     })
      //   }
      // })
      // if (imgs.length > 0) {
      //   for (let i = 0; i < imgs.length; i++) {
      //     images.push(imgs[i].attributes.src.value)
      //     imgs[i].onclick = () => {
      //       ImagePreview({
      //         images: images,
      //         startPosition: i
      //       })
      //     }
      //   }
      // }
    },

    // 关注用户\取消关注的方法
    async onFollow() {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 关注用户
        await addFollow(this.article.aut_id)
      }

      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    // 收藏文章、取消收藏的方法
    async onCollect() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        if (this.article.is_collected) {
          this.$toast.success('取消收藏')
          this.article.is_collected = !this.article.is_collected
          // 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 收藏
          await addCollect(this.articleId)
        }
        this.$toast.success(`${this.article.is_collected ? '取消' : '成功'}收藏`)
        this.article.is_collected = !this.article.is_collected
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .article-wrap {
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    bottom: 44px;
    overflow-y: auto;
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    margin: 0;
    background: #fff;
  }
  .user-info {
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
      color: #333333;
    }
    .publish-date {
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    padding: 14px;
    background: #fff;
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
  }
}
</style>
