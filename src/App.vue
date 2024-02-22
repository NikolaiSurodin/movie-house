<script>
import AppHeader from './components/AppHeader.vue'
import { useMeStore } from './stores/meStore'
import { useFilmStore } from './stores/filmStore'
import { useStore } from './stores/store'
import UpButton from './components/UI/UpButton.vue'
import MobileBottomPanel from './components/MobileBottomPanel.vue'

export default {

  name: 'App',
  components: {
    MobileBottomPanel,
    UpButton,
    AppHeader
  },
  data() {
    return {
      isScroll: false,
      checkBreakpoint: null
    }
  },
  methods: {
    init() {
      const lang = localStorage.getItem( 'lang' )
      const defaultLang = import.meta.env.VITE_DEFAULT_LOCALE || 'en-US'
      if( !lang ) {
        localStorage.setItem( 'lang', defaultLang )
      }
      useMeStore().loadMe()
        .then( ( me ) => {
          useFilmStore().loadFavoriteFilmList( 'movies' )
        } )
    },
    checkScroll() {
      if( window.scrollY > 120 ) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    }
  },
  computed: {
    test() {
      return useStore().initialized
    }
  },
  created() {
    this.init()
  },
  mounted() {
    window.addEventListener( 'scroll', this.checkScroll )
    window.onresize = () => {
      this.checkBreakpoint = setTimeout( () => {
        useStore().updateMobileBreakpoint()
      }, 500 )
    }
  },
  beforeUnmount() {
    window.removeEventListener( 'scroll', this.checkScroll )
    clearTimeout( this.checkBreakpoint )
  }
}
</script>

<template>
  <notifications />
  <app-header :show="isScroll" />
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
    <up-button :show="isScroll" />
  </div>
  <mobile-bottom-panel class="mobile-panel" />
</template>

<style lang="scss" scoped>
@import "assets/styles/mixins";

.mobile-panel {
  display: none;

  @include phone_wide {
    display: block;
  }
}
</style>
