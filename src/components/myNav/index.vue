<template>
  <div class="nav-cotain">
    <van-nav-bar
    class="page-nav-bar"
    :left-arrow="showArrow"
    @click-left="$router.back()"
    >
      <!-- 标题插槽 -->
      <div slot="title">
        <slot name="title"></slot>
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'myNav',
  props: {
    // 控制显示左箭头标识
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
