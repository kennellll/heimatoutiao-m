<template>
  <div class="article-container">
    <!-- 顶部标题栏 -->
    <myNav showArrow>
      <div slot="title">文章标题</div>
    </myNav>
    <!-- 标题 -->
    <h1 class="title">这是文章标题</h1>
    <!-- 作者信息 -->
    <van-cell class="user-info" center :border="false">
      <van-image class="avatar" slot="icon" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div slot="title" class="name">黑马头条号</div>
      <div slot="label" class="publish-date">14小时前</div>
      <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus">关注</van-button>
    </van-cell>
  </div>
</template>

<script>
import myNav from '@/components/myNav'
export default {
  name: 'articlePage',

  components: {
    myNav
  },

  props: {
    // 文章ID
    articleId: {
      type: String,
      default: '123456'
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
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
}
</style>
