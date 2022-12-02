<template>
  <div class="nav-cotain">
    <van-nav-bar
    class="page-nav-bar"
  :title=title
  left-arrow
  @click-left="$router.back()"
/>
  </div>
</template>

<script>
export default {
  name: 'myNav',
  props: {
    // 标题内容
    title: {
      type: String,
      default: '标题'
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
