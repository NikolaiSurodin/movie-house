<script setup>
import { ref, watch, computed, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import { ByClose } from "@kalimahapps/vue-icons"


const props = defineProps( {
  show: Boolean,
  video: {
    type: Object,
    default: () => ( {} )
  }
} )
const emit = defineEmits( [ 'close' ] )

const path = useRoute()
const modal = ref( null )


onUnmounted( () => {
} )

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

const key = computed( () => {
  return props.video.key
} )

</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="search-modal"
      ref="modal"
      @keyup.esc="closeModal"
      tabindex="0"
    >
      <div class="search-modal__container">
        <div class="search-modal__header">
          <ByClose
            class="search-modal__header-close-icon"
            @click="closeModal"
          />
          <slot name="header"></slot>
        </div>

        <div class="search-modal__body">
          <slot name="body"></slot>
          <iframe
            width="880"
            height="505"
            :src="`https://www.youtube.com/embed/${key}?si=jwAejLO-EHw4rtAB`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>

        <div class="search-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: var(--color-background);
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
  }

  &__body {
    margin: 20px 0;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .search-modal__container,
.modal-leave-to .search-modal__container {
  transform: translateY(-100%);
}

</style>