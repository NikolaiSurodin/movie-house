<script setup>
import { ref, watch, onUnmounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'

import { NInput } from 'naive-ui'
import { ByClose } from "@kalimahapps/vue-icons"

import { getFilmsByName } from '../../services/film.service'
import { debounce } from 'lodash'
import { useStore } from '../../stores/store'
import Film from '../../classes/Film'
import TvShow from '../../classes/TvShow'
import Person from '../../classes/Person'
import FilmList from '../../views/FilmList.vue'

const store = useStore()

const modal = ref( null )
const input = ref( null )

const props = defineProps( {
  show: {
    type: Boolean,
    default: false
  }
} )
const emit = defineEmits( [ 'close' ] )

const route = useRoute()


const filmList = ref( [] )
const search = ref( '' )

const tabs =
  {
    series: {
      name: 'menu.series',
      key: 'series',
      type: 'tv',
      path: 'tv-shows',
      route: '/tv-shows'
    },
    films: {
      name: 'menu.films',
      key: 'films',
      type: 'movie',
      path: 'films',
      route: '/films'
    },
    people: {
      name: 'menu.people',
      key: 'people',
      type: 'person',
      path: 'people',
      route: '/people'
    },
  }

onUnmounted( () => {
  clearData()
} )

const update = debounce( () => {
  loadFilmList()
}, 500 )


watch( search, ( value ) => {
  update()
} )

const dict = {
  '/tv-shows': tabs.series,
  '/films': tabs.films,
  '/people': tabs.people
}
const getActiveTab = computed( () => {
  return dict[ route.path ] || dict[ '/films' ]
} )

watch(
  () => props.show,
  ( value ) => {
    if( value ) {
      nextTick( () => {
        modal.value.focus()
        input.value.focus()
        activeTab.value = getActiveTab.value
      } )
    }
  },
  { deep: true }
)

watch( route, () => {
  closeModal()
} )

const activeTab = ref( {} )
watch(
  () => activeTab,
  () => {
    clearData()
  },
  { deep: true }
)

function loadFilmList() {
  const key = activeTab.value.type
  loadCinemas( key )
}

function loadCinemas( key ) {
  getFilmsByName(
    {
      query: search.value
    },
    key,
    ( data ) => {
      switch ( key ) {
        case 'tv':
          filmList.value = data.results.map( el => new TvShow( el ) )
          break
        case 'movie':
          filmList.value = data.results.map( el => new Film( el ) )
          break
        case 'person':
          filmList.value = data.results.map( el => new Person( el ) )
          break
        default:
          filmList.value = data.results
          break
      }
    },
    () => {
    }
  )
}

function clearData() {
  search.value = ''
  filmList.value = []
}

function closeModal() {
  emit( 'close' )
  clearData()
}

function setActiveTab( tab ) {
  activeTab.value = tab
}

</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="search-modal"
      @keyup.esc="closeModal"
      tabindex="0"
      ref="modal"
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
          <n-input
            ref="input"
            size="large"
            round
            :placeholder="$t( `search.search_${ activeTab?.key }` )"
            v-model:value="search"
          />
          <section class="search-modal__tabs">
            <ul class="search-modal__tabs-inner">
              <li
                class="search-modal__tab-item h2"
                :class="{ 'underline': tab.key === activeTab?.key }"
                v-for="( tab, index ) in tabs"
                :key="index"
                @click="setActiveTab( tab )"
              >{{ $t( `${ tab.name }` ) }}
              </li>
            </ul>
          </section>
          <slot name="body"></slot>
        </div>

        <div class="search-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <Transition name="result">
        <div
          class="search-modal__result-modal"
          v-if="filmList.length"
        >
          <film-list
            :film-list="filmList"
            :is-paging="false"
            :columns="store.getIsMobile ? 1 : 2"
            :path="activeTab.path"
          />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/mixins";

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
    height: 150px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: var(--color-background);
    opacity: 0.9;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    @include phone_wide {
      height: 250px;
    }

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

    @include phone_wide {
      margin: 70px 0 0 0;
    }
  }

  &__tabs {
    margin: 20px 0;
  }

  &__tabs-inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
  }

  &__tab-item {
    color: var(--vt-c-white);
    position: relative;
    cursor: pointer;
    @include phone_wide {
      font-size: 16px;
    }
  }

  &__default-button {
    float: right;
  }


  &__result-modal {
    width: 800px;
    height: calc(100% - 160px);
    min-height: 400px;
    margin: 0 auto;
    background-color: var(--color-background);
    border-radius: 12px;
    border: 1px solid #0089FFFF;
    overflow-y: auto;
    transition: all 0.3s ease;

    @include phone_wide {
      width: 100%;
    }
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


.result-enter-from {
  opacity: 0;
}

.result-leave-to {
  opacity: 0;
}

.result-enter-from .search-modal__result-modal,
.result-leave-to .search-modal__result-modal {
  transform: translateY(-100%);
}


</style>