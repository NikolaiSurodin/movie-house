<script setup>
const props = defineProps( {
  text: {
    type: String,
    default: 'text.error_page'
  }
} )
</script>

<template>
  <div class="not-found">
    <div class="not-found__text">
      <p class="h2">
        {{ $t( text ) }}
      </p>
    </div>
    <div class="not-found__img">
      <img src="../assets/images/404-img.png" alt="not-found-img">
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>