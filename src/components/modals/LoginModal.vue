<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import { ByClose } from "@kalimahapps/vue-icons"
import { NButton, NInput, NSpace, NSpin } from 'naive-ui'

import { useMeStore } from '../../stores/meStore'
import { $notify } from '../../helpers/notify'
import { useRouter } from 'vue-router'

const username = ref( 'Nikolya_S_' )
const password = ref( 'Fcbarcelona123789!' )
const isLoading = ref( false )
const router = useRouter()


const props = defineProps( {
  show: Boolean,
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

function login() {
  isLoading.value = true
  useMeStore().login(
    {
      username: username.value,
      password: password.value
    }
  )
    .then( () => {
      console.log( 'ok' )
      isLoading.value = false
      closeModal()
    } )
    .catch( ( error ) => {
      console.log( error )
      $notify(
        '',
        `${ error }`,
        'error'
      )
      isLoading.value = false
    } )
}


</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="login-modal"
      ref="modal"
      @keyup.esc="closeModal"
      tabindex="0"
    >
      <div class="login-modal__container">
        <div class="login-modal__header">
          <slot name="header"></slot>
        </div>

        <div class="login-modal__body">
          <slot name="body"></slot>
          <section class="login-modal__body-header">
            <ByClose
              class="login-modal__header-close-icon"
              @click="closeModal"
            />
          </section>
          <section class="login-modal__body-title">
            <h1 class="h1">{{ $t( 'nav.login' ) }}.</h1>
          </section>
          <div class="login-modal__inner">
            <n-space vertical>
              <n-input
                v-model:value.trim="username"
                type="text"
                placeholder="Login"
                size="large"
                :disabled="isLoading"
              />
              <n-input
                v-model:value.trim="password"
                type="password"
                placeholder="Password"
                size="large"
                :disabled="isLoading"
              >
              </n-input>
            </n-space>
            <n-button
              class="login-modal__button"
              v-if="!isLoading"
              strong
              secondary
              size="large"
              type="success"
              @click="login"
            >
              {{ $t( 'button.login' ) }}
            </n-button>
            <n-spin size="large" v-else />
          </div>
        </div>

        <div class="login-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.login-modal {
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
    width: 680px;
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

.modal-enter-from .login-modal__container,
.modal-leave-to .login-modal__container {
}

</style>