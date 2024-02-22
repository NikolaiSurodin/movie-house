<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useMeStore } from '../stores/meStore'
import { useRouter } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'

import { BsSearch } from "@kalimahapps/vue-icons"
import { NButton, NDropdown } from 'naive-ui'

import { showModal } from '../helpers/showModal'
import { nav, options } from '../const/nav'

const isShowModal = ref( false )
const isShowLoginModal = ref( false )
const isScroll = ref( false )
const store = useMeStore()
const router = useRouter()


const SearchModalAsync = defineAsyncComponent( () => import('@/components/modals/SearchModal.vue') )
const LoginModalAsync = defineAsyncComponent( () => import('@/components/modals/LoginModal.vue') )

const props = defineProps( {
  show: {
    type: Boolean,
    default: false
  }
} )

const navigationList = [ ...nav ].slice( 1, 4 )

function toggleSearchModal( value ) {
  isShowModal.value = value
  showModal( value )
}

function toggleLoginModal( value ) {
  isShowLoginModal.value = value
  showModal( value )
}

function handleSelect( key ) {
  switch ( key ) {
    case 'collection':
      router.push( { name: 'collection' } )
      break
    case 'logout':
      store.logout()
      break
    default:
      break
  }
}
</script>

<template>
  <header
    class="header"
    :class="{ 'header--bg': props.show }"
  >
    <div class="header__left-side">
      <div class="header__logo" @click="$router.push( { name: 'home' } )">
        <img src="@assets/images/icons/logo.svg" alt="logo" />
      </div>
      <div class="header__list header__navigations-list">
        <ul>
          <li
            v-for="( link, index ) in navigationList"
            :key="index"
          >
            <router-link
              class="nav-link"
              :to="link.path"
            >
              {{ $t( link.name ) }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="actions-side">
      <div class="header__list">
        <ul>
          <li>
            <n-button
              size="large"
              @click="toggleSearchModal( true )"
            >
              <template #icon>
                <div class="film__bookmark">
                  <BsSearch class="icon-white" />
                </div>
              </template>
            </n-button>
            <Teleport to="body" v-show="isShowModal">
              <SearchModalAsync
                :show="isShowModal"
                @close="toggleSearchModal( false )"
              >
                <template #header>
                </template>
              </SearchModalAsync>
            </Teleport>
          </li>
          <li
            class="header__menu-item"
            v-if="!store.getIsLoggedIn"
            @click="toggleLoginModal(true)"
          >
            <span>{{ $t( 'nav.login' ) }}</span>
            <Teleport
              to="body"
              v-show="isShowLoginModal"
            >
              <LoginModalAsync
                :show="isShowLoginModal"
                @close="toggleLoginModal( false )"
              >
              </LoginModalAsync>
            </Teleport>
          </li>
          <li
            class="header__menu-item"
            v-if="useMeStore().getIsLoggedIn"
          >
            <n-dropdown
              :options="options"
              @select="handleSelect"
            >
              <img
                class="header__me-image"
                :src="useMeStore().getAvatar"
              >
            </n-dropdown>
          </li>
          <li>
          </li>
          <li>
            <language-switcher />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "../assets/styles/mixins";

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 100px;
  transition: all 0.3s ease;

  @include phone_wide {
    padding: 12px;
  }

  &--bg {
    background-color: var(--color-background);
    opacity: 0.9;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }

  &__left-side {
    display: flex;
    gap: 12px;
  }

  &__logo {
    width: auto;
    height: 45px;
    margin-right: 18px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__menu-item {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &__me-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__list, ul {
    display: flex;
    color: var(--color-text);
  }

  &__navigations-list {

    @include phone_wide {
      display: none;
    }
  }

  ul {
    gap: 18px;

    li {
      color: var(--vt-c-white);
      font-size: 22px;
    }
  }


}
</style>