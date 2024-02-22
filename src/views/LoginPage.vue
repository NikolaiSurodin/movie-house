<template>
  <div class="login">
    <div class="login__inner">
      <n-space vertical>
        <n-input
          v-model:value.trim="username"
          type="text"
          placeholder="Login"
          size="large"
        />
        <n-input
          v-model:value.trim="password"
          type="password"
          placeholder="Password"
          size="large"
        >
        </n-input>
      </n-space>
      <n-button
        strong
        secondary
        size="large"
        type="success"
        @click="login"
      >
        {{ $t( 'button.login' ) }}
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { NSpace, NInput, NButton, NIcon } from 'naive-ui'
import { ref } from 'vue'
import { useMeStore } from '../stores/meStore'
import { useRouter } from 'vue-router'

const username = ref( 'Nikolya_S_' )
const password = ref( 'Fcbarcelona123789!' )
const router = useRouter()

function login() {
  useMeStore().login(
    {
      username: username.value,
      password: password.value
    }
  )
  router.replace( { name: 'home' } )
}
</script>

<style lang="scss" scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  height: calc(100vh - 100px);

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 100px;
    height: 100%;
  }
}
</style>