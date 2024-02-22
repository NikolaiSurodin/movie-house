<script setup>
import FilmList from '../../views/FilmList.vue'
import { useFilmStore } from '../../stores/filmStore'
import { $notify } from '../../helpers/notify'
import { cinemaType } from '../../const/cinemaType'

defineProps( {
  filmList: {
    type: Array,
    default: () => ( [] )
  },
  page: {
    type: Number,
    default: 1
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isShowLoadButton: {
    type: Boolean,
    default: false
  }
} )

const emit = defineEmits( [ 'loadFilms' ] )

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

</script>

<template>
  <div class="recommendations">
    <h1 class="h1">{{ $t( 'info.recommendations' ) }}</h1>
    <film-list
      :film-list="filmList"
      :is-loading="isLoading"
      :is-paging="false"
      :is-load-button="isShowLoadButton"
      not-found-text="partial.not_recommendations"
      @load-films="emit( 'loadFilms' )"
      @marked-film="addToFavorite"
    />
  </div>
</template>

<style scoped lang="scss">

</style>