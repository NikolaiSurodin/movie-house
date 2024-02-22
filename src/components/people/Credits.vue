<script setup>
import FilmList from '../../views/FilmList.vue'
import { useFilmStore } from '../../stores/filmStore'
import { $notify } from '../../helpers/notify'
import { cinemaType } from '../../const/cinemaType'

const props = defineProps( {
  items: {
    type: Array,
    default: () => ( [] )
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
  <div class="person-credits">
    <film-list
      :film-list="items"
      not-found-text="text.no_films"
      :is-paging="false"
      @marked-film="addToFavorite"
    />
  </div>
</template>

<style scoped lang="scss">

</style>