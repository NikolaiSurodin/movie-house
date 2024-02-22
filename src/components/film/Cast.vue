<script setup>
import PeopleSlider from '../sliders/PeopleSlider.vue'

defineProps( {
  personList: {
    type: Array,
    default: () => ( [] )
  },
  isLoading: {
    type: Boolean,
    default: false
  },
} )
</script>

<template>
  <div class="cast">
    <h1 class="h1">CAST</h1>
    <people-slider
      :items="personList"
      :slides-per-view="5"
    />
  </div>
</template>

<style scoped lang="scss">

</style>