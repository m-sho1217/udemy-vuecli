<template>
  <div>
    <like-header></like-header>
    <h2>{{ number }}</h2>
    <LikeNumber :total-number="number"></LikeNumber>
    <LikeNumber></LikeNumber>
  </div>
</template>

<script>
import LikeNumber from './components/LikeNumber.vue'

export default {
  data() {
    return {
      number: 30,
    }
  },
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