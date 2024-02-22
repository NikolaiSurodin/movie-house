<script setup>
import ReviewItem from '../ReviewItem.vue'

const props = defineProps( {
  reviews: {
    type: Array,
    default: () => ( [] )
  }
} )
</script>

<template>
  <div class="review-list">
    <template v-if="reviews.length">
      <review-item
        v-for="item in reviews"
        :key="item.id"
        :review="item"
      />
    </template>
    <template v-else>
      No review
    </template>
  </div>
</template>

<style scoped lang="scss">
.review-list {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px
}
</style>