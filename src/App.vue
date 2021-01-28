<template>
  <div>
    <like-header></like-header>
    <LikeNumber></LikeNumber>
  </div>
</template>

<script>
import LikeNumber from './components/LikeNumber.vue'

export default {
  components: {
    LikeNumber
  }
}
</script>

<style scoped>
  div {
    border: 1px solid blue;
  }
</style>