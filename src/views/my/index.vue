<template>
  <div class="my-container">
    <!-- 顶部区域 -->
    <van-cell-group class="my-info" v-if="userInfo">
      <!-- 基础信息 -->
      <van-cell center class="base-info" :border="false">
        <template #icon>
          <van-image class="avatar" :src="currentUser.photo" round fit="cover" />
        </template>
        <template #title>
          <span class="name">{{currentUser.name}}</span>
        </template>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <!-- 数据信息 -->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录 -->
    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="@/assets/mobile.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!--中部区域  -->
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 底部区域 -->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell class="logout-cell" title="退出登录" v-if="userInfo" @click="onLogout"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myPage',

  data () {
    return {
      // 用户信息
      currentUser: {}
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  created () {
    this.loadCurrentUser()
  },

  methods: {
    ...mapMutations('user', ['setUser']),
    // 退出登录的方法
    onLogout () {
      // 清掉用户信息
      this.$dialog.confirm({
        title: '提示',
        message: '确定退出登录嘛'
      })
        .then(() => {
          this.setUser(null)
        })
        .catch(() => {

        })
    },
    // 请求用户信息的方法
    async loadCurrentUser () {
      const res = await getUserInfo()
      this.currentUser = res
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('@/assets/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url('@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
