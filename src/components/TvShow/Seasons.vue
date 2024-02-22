<script setup>
import SeriesSeasonItem from './SeriesSeasonItem.vue'

const props = defineProps( {
  seasons: {
    type: Object,
    default: () => ( {} )
  },
  tvShowId: {
    type: Number,
    default: 0
  }
} )
</script>

<template>
  <div class="seasons">
    <series-season-item
      v-for="item in seasons"
      :key="item.id"
      :season="item"
      :tv-show-id="tvShowId"
    />
  </div>
</template>

<style scoped lang="scss">
.seasons {
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>