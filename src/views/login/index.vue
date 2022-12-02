<template>
  <div class="login-container">
    <!-- 顶部导航栏 -->
    <myNav title="登录" />
    <!-- 表单 -->
    <van-form
    ref="loginForm"
    validate-first
    :show-error="false"
    :show-error-message="false"
    @submit="onLogin"
    @failed="onFailed"
    >
      <van-field v-model="user.mobile" icon-prefix="toutiao" name="mobile" left-icon="shouji" placeholder="请输入手机号码" :rules="userFormRules.mobile"/>
      <van-field v-model="user.code" center icon-prefix="toutiao" left-icon="yanzhengma" placeholder="请输入验证码" clearable :rules="userFormRules.code">
        <template #button>
          <van-count-down :time="(1000*60)"
          format=" ss秒后可重新发送"
          v-if="isCountDownShow"
          @finish="(isCountDownShow = false)"

          />
          <van-button class="send-btn" native-type="button" :loading="isSendSmsLoading" size="mini" round @click="onSendSms" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import myNav from '@/components/myNav'
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'loginPage',
  components: {
    myNav
  },
  data () {
    return {
      // 表单信息
      user: {
        mobile: '13911111111',
        code: ''
      },
      // 校验规则
      userFormRules: {
        mobile: [{ required: true, message: '请填写手机号' },
          { pattern: /^[1][3,4,5,6.7,8,9][0-9]{9}$/, message: '手机号码不合法' }],
        code: [{ required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '手机号码不合法' }]
      },
      // 倒计时显示标识
      isCountDownShow: false,
      // 按钮加载中状态标识
      isSendSmsLoading: false

    }
  },
  methods: {
    // 登录的方法
    async onLogin () {
      const res = await login(this.user)
      console.log(res)
    },
    // 错误提示的方法
    onFailed (errorInfo) {
      errorInfo.errors[0] && (this.$toast.fail({
        message: errorInfo.errors[0].message,
        forbidClick: true,
        position: 'top'
      }))
    },
    // 发送验证码的方法
    async onSendSms () {
      // 手动验证手机
      try {
        await this.$refs.loginForm.validate('mobile')
        // 验证码按钮显示加载状态
        this.isSendSmsLoading = true
        // 发验证码接口
        await sendSms(this.user.mobile)
        // 显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        let message
        if (error.response && error.response.status === 429) {
          message = error.response.data.message
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后再试'
        }
        this.$toast.fail({
          message,
          forbidClick: true,
          position: 'top'
        })
      }
      // 关闭验证码按钮的加载状态
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
