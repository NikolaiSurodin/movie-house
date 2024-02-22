<script setup>
import FilterSideBar from '../components/FilterSideBar.vue'

import { computed, onMounted, ref, watch } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import { useRouter, useRoute } from 'vue-router'
import FilmList from './FilmList.vue'
import { NSpin } from 'naive-ui'

import { getGenres, getKeyWords } from '../services/film.service'
import { cinemaType } from '../const/cinemaType'
import Film from '../classes/Film'

import { useLoadFilmList } from '../composables/fetch'
import { $notify } from '../helpers/notify'
import { useFilmStore } from '../stores/filmStore'
import { useStore } from '../stores/store'


const router = useRouter()
const location = useRoute()
let activeGenres = ref( [] )
let activeGenresId = ref( [] )
let activeKeyWordsId = ref( [] )

let page = useRouteQuery( 'page', '1', { transform: Number } )
let with_genres = useRouteQuery( 'with_genres', '', { transform: String } )
let with_keywords = useRouteQuery( 'with_keywords', '', { transform: String } )

watch( page, () => {
  const genres = with_genres.value || ''
  const keyWords = with_keywords.value || ''
  useLoadFilmList( cinemaType.MOVIE, { page: page.value, with_genres: genres, with_keywords: keyWords } )
} )

onMounted( () => {
  loadGenres()
} )

const { filmList, currentPage, isLoading } = useLoadFilmList(
  cinemaType.MOVIE,
  {
    page: page.value,
    with_genres: with_genres.value,
    with_keywords: with_keywords.value
  },
)
const normalizeList = computed( () => {
  return filmList.value.map( el => new Film( el ) )
} )

let genres = ref( [] )
const keyWordList = ref( [] )

const setPage = ( value ) => {
  currentPage.value = value
  page.value = value
}

const loadGenres = () => {
  getGenres(
    cinemaType.MOVIE,
    ( data ) => {
      genres.value = data.genres.map( el => {
        return { ...el, isActive: false }
      } )
    },
    ( err ) => {
      console.log( err )
    }
  )
}

const setGenre = ( item ) => {
  item.isActive = !item.isActive
  if( item.isActive ) {
    activeGenres.value.push( item )
    activeGenresId.value.push( item.id )

  } else {
    activeGenres.value = activeGenres.value.filter( el => el.name !== item.name )
    activeGenresId.value = activeGenresId.value.filter( el => el !== item.id )
  }
}

const searchKeyWord = ( value ) => {
  getKeyWords(
    { query: value },
    ( data ) => {
      keyWordList.value = data.results.map( el => {
        return { label: el.name, value: el.id }
      } )
    },
    ( err ) => {
      console.log( err )
    }
  )
}

const search = () => {
  if( activeGenresId.value.length || activeKeyWordsId.value.length ) {
    with_genres.value = activeGenresId.value.length ? activeGenresId.value.join( ',' ) : ''
    with_keywords.value = activeKeyWordsId.value.length ? activeKeyWordsId.value.join( ',' ) : ''
    page.value = 1
    useLoadFilmList( cinemaType.MOVIE, { page: page.value, with_genres: with_genres.value, with_keywords: with_keywords.value } )
    if( useStore().getIsMobile ) {
      toggleBar()
    }
  }
}

const setDefaultParams = () => {
  page.value = 1
  with_genres.value = []
  with_keywords.value = []
  genres.value.forEach( el => el.isActive = false )
  activeGenres.value = []
  activeGenresId.value = []
  activeKeyWordsId.value = []
}

const clearParams = () => {
  router.replace( { path: location.path } )
  setDefaultParams()
  useLoadFilmList( cinemaType.MOVIE, { page: page.value } )
  if( useStore().getIsMobile ) {
    toggleBar()
  }
}

const setActiveKeyWords = ( value ) => {
  activeKeyWordsId.value = value
}

function addToFavorite( id ) {
  useFilmStore().addFilmToFavoriteList(
    id,
    true,
    cinemaType.MOVIE
  )
    .then( () => {
      $notify(
        '',
        'notification.add_film',
        'success'
      )
    } )
    .catch( () => {
      $notify(
        '',
        'notification.something_wrong',
        'error'
      )
    } )
}

const isShowSearchBar = ref( false )

function toggleBar() {
  isShowSearchBar.value = !isShowSearchBar.value
}

</script>

<template>
  <div class="films">
    <div class="films__inner" v-if="filmList.length">
      <filter-side-bar
        :genres="genres"
        :key-words="keyWordList"
        :is-show-bar="isShowSearchBar"
        @toggle-bar="toggleBar"
        @set-genre="setGenre"
        @search-key-word="searchKeyWord"
        @set-active-key-words="setActiveKeyWords"
        @search="search"
        @clear-params="clearParams"
      />
      <film-list
        class="films__list"
        :filmList="normalizeList"
        :page="page"
        :is-loading="isLoading"
        @change-page="setPage"
        @marked-film="addToFavorite"
        :columns="useStore().getIsMobile ? 1 : 3"
      />
    </div>
    <div class="loading" v-else>
      <n-spin size="large" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.films {
  &__list {
    max-width: 1100px;
    margin: 0 auto;
  }
}
</style>
