<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CardSlider from '../components/sliders/CardSlider.vue'
import MainSlider from '../components/sliders/MainSlider.vue'
import SocialBlock from '../components/UI/SocialBlock.vue'
import { getGenres } from '../services/film.service'
import { genresDict } from '../dict/genres'
import { cinemaType } from '../const/cinemaType'
import {
  useLoadNowPlayingFilms,
  useLoadPopularFilms,
  useLoadPopularSeries, useLoadTopFilms
} from '../composables/loadSections'
import Film from '../classes/Film'
import TvShow from '../classes/TvShow'
import { useMeStore } from '../stores/meStore'
import { useFilmStore } from '../stores/filmStore'
import { $notify } from '../helpers/notify'

const { playingNow } = useLoadNowPlayingFilms()
const { popularFilmList } = useLoadPopularFilms()
const { popularSeriesList } = useLoadPopularSeries()
const { topRatingFilmList } = useLoadTopFilms()

function normalizeFormat( arr, type ) {
  const defaultType = cinemaType.MOVIE
  return type === defaultType ? arr.map( el => new Film( el ) ) : arr.map( el => new TvShow( el ) )
}

const lang = localStorage.getItem( 'lang' )
const genres = ref( [] )

const store = useMeStore()
const storeFilm = useFilmStore()

watch(
  () => store.getIsLoggedIn,
  ( value ) => {
    if( value ) {
      storeFilm.loadFavoriteFilmList( 'movies' )
    }
  },
  { deep: true }
)

onMounted( () => {
  loadGenres()
  if( store.getIsLoggedIn ) {
    storeFilm.loadFavoriteFilmList( 'movies' )
  }
} )

function loadGenres() {
  getGenres(
    'movie',
    ( data ) => {
      genres.value = data.genres.map( el => {
        return {
          id: el.id,
          name: el.name,
          image: getImageUrl( el.name )
        }
      } )
    },
    ( err ) => {
      console.log( err )
    }
  )
}

const key = ref( '' )
const getFile = ( path ) => {
  let file = null
  if( lang === 'en-US' ) {
    file = Object.keys( genresDict ).find( el => el === path.toLowerCase() )
  } else {
    for ( let key in genresDict ) {
      if( genresDict[ key ] === path ) {
        file = key
      }
    }
  }
  key.value = file
  return file
}

const getImageUrl = ( path ) => {
  return new URL( `/src/assets/images/genres/${ getFile( path ) }.png`, import.meta.url ).href
}

function filteredFavoriteFilmList( id ) {
  storeFilm.filterMyFavoriteFilmList( id )
}

function loadFavoriteFilmList() {
  storeFilm.loadFavoriteFilmList( 'movies' )
}

const router = useRouter()

function toGenre( id ) {
  router.push( { path: '/films', query: { with_genres: id, page: 1 } } )
}

function markFilm( id, isCanToAddToFavorite, mediaType ) {
  storeFilm.addFilmToFavoriteList(
    id,
    isCanToAddToFavorite,
    mediaType
  )
    .then( () => {
      $notify(
        '',
        isCanToAddToFavorite ? 'notification.add_film' : 'notification.remove_film',
        'success'
      )
      if( mediaType === cinemaType.MOVIE ) {
        storeFilm.loadFavoriteFilmList( 'movies' )
      }
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
  <div class="home">
    <div class="home__main-slider">
      <main-slider :items="playingNow" />
    </div>
    <div class="home__social-block">
      <social-block />
    </div>
    <div class="home__slide-block" v-if="store.getIsLoggedIn">
      <div class="home__slide-block-title">
        <p class="h1">{{ $t( 'home.favorite_films_title' ) }}</p>
      </div>
      <card-slider
        :items="storeFilm.getMyFavoriteFilmList"
        :is-film="true"
        :is-can-add-to-favorite="false"
        height="450px"
        @loadFavoriteFilmList="loadFavoriteFilmList"
        @filteredFavoriteFilmList="filteredFavoriteFilmList"
        @markedFilm="markFilm"
      />
    </div>
    <div class="home__slide-block">
      <div class="home__slide-block-title">
        <p class="h1">{{ $t( 'home.top_films_title' ) }}</p>
      </div>
      <card-slider
        :items="normalizeFormat( topRatingFilmList, cinemaType.MOVIE )"
        :is-film="true"
        height="450px"
        @loadFavoriteFilmList="loadFavoriteFilmList"
        @filteredFavoriteFilmList="filteredFavoriteFilmList"
        @markedFilm="markFilm"
      />
    </div>
    <div class="home__slide-block">
      <div class="home__slide-block-title">
        <p class="h1">{{ $t( 'home.popular_films_title' ) }}</p>
      </div>
      <card-slider
        :items="normalizeFormat( popularFilmList, cinemaType.MOVIE )"
        :is-film="true"
        height="450px"
        @markedFilm="markFilm"
      />
    </div>

    <div class="home__slide-block">
      <div class="home__slide-block-title">
        <p class="h1">{{ $t( 'home.popular_series_title' ) }}</p>
      </div>
      <card-slider
        :items="normalizeFormat( popularSeriesList, cinemaType.TV )"
        :is-film="true"
        path="tv-shows"
        height="450px"
        @markedFilm="markFilm"
      />
    </div>

    <div class="home__slide-block">
      <div class="home__slide-block-title">
        <p class="h1">{{ $t( 'home.genres_title' ) }}</p>
      </div>
      <card-slider
        :items="genres"
        :key="key"
        @clickOnCard="toGenre"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";

.home {
  padding: 80px 10px;

  &__main-slider {
    height: 560px;

    @include tablet {
      height: 350px;
    }
  }

  &__social-block {
    padding: 2rem 9.5rem;

    @include laptop {
      padding: 12px;
    }
  }

  &__slide-block {
    margin: 30px 0;
  }

  &__slide-block-title {
    padding: 30px 0 30px 50px;
    color: #f2f2f2;
  }
}
</style>