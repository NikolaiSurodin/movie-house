<script setup>
const props = defineProps( {
  title: {
    type: String,
    default: ''
  },
  imagePath: {
    type: String,
    default: ''
  }
} )

</script>

<template>
  <div class="small-card">
    <div class="small-card__poster">
      <div class="small-card__title">
        {{ props.title }}
      </div>
      <div class="small-card__image">
        <img :src="props.imagePath">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.small-card {
  background: #2d303b;
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  transition: all .2s ease 0s;
  width: 100%;
  cursor: pointer;

  &::before {
    background: hsla(0, 0%, 100%, .15);
    border-radius: 12px;
    content: "";
    inset: 0;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
    position: absolute;
    z-index: 3;
  }

  &:hover {
    background: #2d303b;
    box-shadow: 0 20px 25px -15px #0f1321;
    border: 1px solid #0089FFFF;
  }

  &__title {
    color: #f2f2f2;
  }
}
</style>