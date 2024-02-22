<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import { ByClose } from "@kalimahapps/vue-icons"
import { NButton, NInput, NSpace } from 'naive-ui'
import ImageSlider from '../sliders/ImageSlider.vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const props = defineProps( {
  show: Boolean,
  images: {
    type: Array,
    default: () => ( [] )
  }
} )
const emit = defineEmits( [ 'close' ] )

const path = useRoute()
const modal = ref( null )

watch( path, () => {
  closeModal()
} )
watch(
  () => props.show,
  ( value ) => {
    if( value ) {
      nextTick( () => {
        modal.value.focus()
      } )
    }
  },
  { deep: true }
)

function closeModal() {
  emit( 'close' )
}

</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="image-modal"
      ref="modal"
      @keyup.esc="closeModal"
      tabindex="0"
    >
      <div class="image-modal__container">
        <div class="image-modal__header">
          <slot name="header"></slot>
        </div>

        <div class="image-modal__body">
          <slot name="body"></slot>
          <section class="image-modal__body-header">
            <ByClose
              class="image-modal__header-close-icon"
              @click="closeModal"
            />
          </section>
          <section class="image-modal__body-title">
          </section>
          <div class="image-modal__inner">
            <image-slider
              :items="images"
            />
          </div>
        </div>
        <div class="image-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.image-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  color: #f2f2f2;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 30px;
    opacity: 1;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &__header {
    position: absolute;
    right: 50px;
    top: 35px;
    font-size: 25px;
    margin-top: 0;
    color: #f2f2f2;
  }

  &__header-close-icon {
    cursor: pointer;
    font-size: 24px;
    color: #f2f2f2;
  }

  &__body {
    margin: 20px 0;
    background: #1a1d29;
    border: 1px solid hsla(0, 0%, 100%, .05);
    border-radius: 12px;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 20px 32px 40px;
    width: 100%;
    height: 100%;
  }

  &__body-header {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  &__inner {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    display: flex;
  }

  &__button {
    margin-top: 50px;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .image-modal__container,
.modal-leave-to .image-modal__container {
}

</style>