<script setup>
import { onUnmounted, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import FilmList from './FilmList.vue'
import { computed, ref } from 'vue'
import { useFilmStore } from '../stores/filmStore'
import { useMeStore } from '../stores/meStore'
import TvShow from '../classes/TvShow'
import { getMyFavoriteFilmList } from '../services/film.service'
import { $notify } from '../helpers/notify'

onMounted( () => {
  isLoading.value = true
  loadUpdateList( 'movies' )
  isLoading.value = false
} )
onUnmounted( () => {
  tvShowList.value = []
} )

const isLoading = ref( false )
const filmStore = useFilmStore()
const myCollection = computed( () => {
  return filmStore.getMyFavoriteFilmList
} )

const tabs = [
  {
    name: 'menu.films',
    key: 'movies',
    media_type: 'movie'
  },
  {
    name: 'menu.series',
    key: 'tv',
    media_type: 'tv'
  },
]
const activeTab = ref( tabs[ 0 ] )

watch( () => activeTab.value.key,
  ( value ) => {
    if( value === 'tv' && !tvShowList.value.length ) {
      loadUpdateList( 'tv' )
    }
  },
  { deep: true }
)
const router = useRouter()

watch( () => useMeStore().getIsLoggedIn,
  ( value ) => {
    if( !value ) {
      router.replace( { path: '/' } )
    }
  },
  { deep: true }
)

const { me, session } = useMeStore()

const tvShowList = ref( [] )

function setActiveTab( tab ) {
  activeTab.value = tab
}

function loadUpdateList( key ) {
  if( activeTab.value.key === 'tv' ) {
    isLoading.value = true
    getMyFavoriteFilmList(
      me.id,
      'tv',
      { session_id: session },
      ( data ) => {
        tvShowList.value = data.results.map( el => new TvShow( el ) )
        isLoading.value = false
      },
      () => {
      }
    )
  } else {
    filmStore.loadFavoriteFilmList( key )
  }
}

function removeFromFavorite( id ) {
  useFilmStore().addFilmToFavoriteList(
    id,
    false,
    activeTab.value.media_type
  )
    .then( () => {
      $notify(
        '',
        'text.remove_film',
        'success'
      )
      loadUpdateList( activeTab.value.key )
    } )
    .catch( () => {
      $notify(
        '',
        'error',
        'error'
      )
    } )
}

</script>

<template>
  <div class="my-collection">
    <div class="my-collection__header">
      <h1 class="my-collection__title">MY COLLECTION</h1>
      <section class="my-collection__tabs">
        <ul class="my-collection__tabs-inner">
          <li
            class="my-collection__tab-item h2"
            :class="{ 'underline': tab.key === activeTab?.key }"
            v-for="( tab, index ) in tabs"
            :key="index"
            @click="setActiveTab( tab )"
          >{{ $t( `${ tab.name }` ) }}
          </li>
        </ul>
      </section>
    </div>
    <div class="my-collection__inner">
      <template v-if="activeTab.key === 'movies'">
        <film-list
          :film-list="myCollection"
          :columns="4"
          :is-paging="false"
          :is-next-page-panel="false"
          :is-can-add-to-favorite="false"
          :is-loading="isLoading"
          not-found-text="text.not_collection"
          @marked-film="removeFromFavorite"
          media-type="movie"
        />
      </template>
      <template v-else>
        <film-list
          :film-list="tvShowList"
          :columns="4"
          :is-paging="false"
          :is-next-page-panel="false"
          :is-loading="isLoading"
          :is-can-add-to-favorite="false"
          path="tv-shows"
          media-type="tv"
          not-found-text="text.not_collection"
          @marked-film="removeFromFavorite"
        />
      </template>
    </div>
  </div>

</template>

<style scoped lang="scss">
.my-collection {
  color: #f2f2f2;

  &__inner {
    width: 1200px;
    margin: 0 auto;
  }

  &__header {
    padding-left: 100px;
  }

  &__title {

  }

  &__tabs {
    display: flex;
    padding: 20px 0;
    position: fixed;
    z-index: 13;
    width: 7%;
  }

  &__tabs-inner {
    justify-content: center;
    width: 100%;
  }

  &__tab-item {
    color: var(--vt-c-white);
    position: relative;
    cursor: pointer;
    margin: 20px 0;
    text-align: center;
  }

}
</style>