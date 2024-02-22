<script setup>
import FilmList from '../../views/FilmList.vue'
import { useFilmStore } from '../../stores/filmStore'
import { $notify } from '../../helpers/notify'
import { cinemaType } from '../../const/cinemaType'


defineProps( {
  similarFilmList: {
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
  }
} )

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
  <div
    class="similar"
  >
    <h1 class="h1">Similar film list</h1>
    <film-list
      :film-list="similarFilmList"
      :is-loading="isLoading"
      :is-paging="false"
      @marked-film="addToFavorite"
    />
  </div>
</template>

<style scoped lang="scss">

</style>