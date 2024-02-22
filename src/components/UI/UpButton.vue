<script setup>
import { FlFilledIOsArrowRtl } from "@kalimahapps/vue-icons"
import { scrollTo } from '../../helpers/scrollTo'

const props = defineProps( {
  show: {
    type: Boolean,
    default: false
  }
} )

</script>

<template>
  <div
    class="up-button"
    :class="{ 'up-button--show': props.show }"
    title="Up"
    @click="scrollTo"
  >
    <FlFilledIOsArrowRtl class="up-button__icon" />
  </div>
</template>

<style scoped lang="scss">
.up-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #007aff;
  background-color: transparent;
  position: fixed;
  bottom: 10%;
  width:54px;
  height: 54px;
  right: 20px;
  transition: 0.4s;
  border-radius: 15%;
  border: 1px #007aff solid;
  cursor: pointer;
  z-index: 100;
  opacity: 0;

  &__icon {
    transform: rotate(-90deg);
  }

  &:hover {
    background-color: #000;
  }

  &--show {
    opacity: 1;
  }
}
</style>