<script setup>
import { computed, watch } from 'vue'

import FilmList from './FilmList.vue'
import { useLoadFilmList } from '../composables/fetch'
import { cinemaType } from '../const/cinemaType'
import TvShow from '../classes/TvShow'
import { useRouteQuery } from '@vueuse/router'
import { useFilmStore } from '../stores/filmStore'
import { $notify } from '../helpers/notify'
import { NSpin } from 'naive-ui'

let page = useRouteQuery( 'page', '1', { transform: Number } )
const { filmList, currentPage, isLoading } = useLoadFilmList( cinemaType.TV, { page: page.value } )

const setPage = ( value ) => {
  currentPage.value = value
  page.value = value
}

watch( page, () => {
  useLoadFilmList( cinemaType.TV, { page: page.value } )
} )

const normalizeList = computed( () => {
  return filmList.value.map( el => new TvShow( el ) )
} )

function addToFavorite( id ) {
  useFilmStore().addFilmToFavoriteList(
    id,
    true,
    cinemaType.TV
  )
    .then( () => {
      $notify(
        '',
        'notification.add_show',
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

</script>

<template>
  <div class="tv-shows" v-if="filmList.length">
    <film-list
      :film-list="normalizeList"
      :is-loading="isLoading"
      :columns="5"
      :page="page"
      path="tv-shows"
      @change-page="setPage"
      @marked-film="addToFavorite"
    />
  </div>

  <div class="loading" v-else>
    <n-spin size="large" />
  </div>
</template>

<style scoped lang="scss">

</style>