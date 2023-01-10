<template>
  <van-cell title="单元格" value="内容" />
</template>

<script>
export default {
  props: {
    // 评论数据
    comment: {
      type: Object,
      require: true
    }
  }
}
</script>

<style>
</style>
