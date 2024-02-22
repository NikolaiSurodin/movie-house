<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch, computed, watchEffect } from 'vue'
import { loadImages } from '../composables/loadCinemaAddedInfo'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/navigation'
import 'swiper/css'

import {
  getFilmItem,
  getRecommendations,
  getSimilarFilmList,
  getTrailers,
  getReviews
} from '../services/film.service'

import Film from '../classes/Film'
import Review from '../classes/Review'
import { showModal } from '../helpers/showModal'
import { NTag, NButton } from 'naive-ui'
import { BsBookmarkFill, BsPlayFill, ClImage01 } from "@kalimahapps/vue-icons"
import { useFilmStore } from '../stores/filmStore'
import { useMeStore } from '../stores/meStore'
import { $notify } from '../helpers/notify'
import { cinemaType } from '../const/cinemaType'

import Recommendations from '../components/film/Recommendations.vue'
import Details from '../components/film/Details.vue'
import Similar from '../components/film/Similar.vue'
import Cast from '../components/film/Cast.vue'
import Reviews from '../components/film/Reviews.vue'
import VideoModal from '../components/modals/VideoModal.vue'
import ImageModal from '../components/modals/ImageModal.vue'

const route = useRoute()

const isLoading = ref( false )
const film = ref( {} )

let recommendationsList = ref( [] )
let trailerList = ref( [] )

let similarListPage = ref( 1 )
let similarList = ref( [] )

let filmCast = ref( [] )
let filmCrew = ref( [] )
let filmDirector = ref( {} )

let currentTab = ref( 'Details' )
const tabs = {
  Details,
  Recommendations,
  Similar,
  Cast,
  Reviews
}
const recommendationsTab = 'Recommendations'
const similarTab = 'Similar'

const breakpoints = {
  320: {
    slidesPerView: 1,
  },
  420: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 3,
  },
  800: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 5,
  },
  1440: {
    slidesPerView: 10,
  },
}

const isShowModal = ref( false )

const randomTrailer = computed( () => {
  return trailerList.value[ Math.floor( Math.random() * trailerList.value.length ) ]
} )

watch( currentTab, ( value ) => {
  if( value === recommendationsTab && !recommendationsList.value.length ) {
    loadRecommendations()
  }
  if( value === similarTab && !similarList.value.length ) {
    loadSimilar()
  }
} )
const { imageList } = loadImages( route.params.id, cinemaType.MOVIE )

onMounted( () => {
  loadFilm()
  loadTrailers()
  loadReviews()

} )

function showTrailer( value ) {
  isShowModal.value = value
  showModal( value )
}

const isShowImageModal = ref( false )

function showImages( value ) {
  isShowImageModal.value = value
  showModal( value )
}

function loadFilm() {
  getFilmItem(
    route.params.id,
    cinemaType.MOVIE,
    ( data ) => {
      film.value = new Film( data )
      filmCast.value = film.value.credits?.cast?.slice( 0, 10 )
      filmCrew.value = film.value.credits?.crew.slice( 0, 10 )
      filmDirector.value = filmCrew.value.find( el => el.known_for_department === 'Directing' )

    },
    ( err ) => {
      console.log( err )
    }
  )
}

const recommendationListPage = ref( 1 )
const totalRecommendationsListPage = ref( 2 )
const isShowLoadButton = ref( true )

const isPagingLoading = ref( false )

function loadRecommendations() {
  getRecommendations(
    {
      page: recommendationListPage.value
    },
    route.params.id,
    cinemaType.MOVIE,
    ( data ) => {
      recommendationListPage.value = data.page
      totalRecommendationsListPage.value = data.total_pages
      recommendationsList.value = [ ...recommendationsList.value, ...data.results.map( el => new Film( el ) ) ]
      isLoading.value = false

    },
    ( err ) => {
      console.log( err )
    }
  )
}

function loadFilms() {
  if( recommendationListPage.value === totalRecommendationsListPage.value ) {
    isShowLoadButton.value = false
    return
  }
  recommendationListPage.value++
  loadRecommendations()
}

function loadSimilar() {
  isLoading.value = true
  getSimilarFilmList(
    {
      page: 1
    },
    route.params.id,
    cinemaType.MOVIE,
    ( data ) => {
      similarList.value = data.data.results.map( el => new Film( el ) )
      similarListPage.value = data.page
      isLoading.value = false
    },
    ( err ) => {
      console.log( err )
      isLoading.value = false
    },
  )
}

function loadTrailers() {
  getTrailers(
    route.params.id,
    cinemaType.MOVIE,
    ( data ) => {
      trailerList.value = data.results.filter( el => [ 'Teaser', 'Trailer' ].includes( el.type ) )
    },
    ( err ) => {
      console.log( err )
    }
  )
}

const { session, me } = useMeStore()
const isFavorite = computed( () => {
  return !!favoriteFilmIdList.value.includes( Number( route.params.id ) )
} )

const favoriteFilmIdList = ref( [] )
watchEffect( () => {
  const { getMyFavoriteFilmIdList } = useFilmStore()
  favoriteFilmIdList.value = getMyFavoriteFilmIdList
} )

function markFilm() {
  if( !isFavorite ) {
    return
  }
  if( !useMeStore().getIsLoggedIn ) {
    $notify(
      '',
      'Please, login',
      'warning'
    )
    return
  }
  useFilmStore().addFilmToFavoriteList( film.value.id, true, film.value.media_type )
    .then( () => {
      $notify(
        '',
        'This film was added to favorite!',
        'success'
      )
      useFilmStore().loadFavoriteFilmList( 'movies' )
    } )
    .catch( () => {
      $notify(
        '',
        'Something wrong',
        'error'
      )
    } )
}

const reviewList = ref( [] )

function loadReviews() {
  getReviews(
    route.params.id,
    cinemaType.MOVIE,
    ( data ) => {
      reviewList.value = data.results.map( el => new Review( el ) )
    },
    () => {
    }
  )
}

const router = useRouter()

function toGenre( id ) {
  router.push( { path: '/films', query: { with_genres: id, page: 1 } } )
}

</script>

<template>
  <article class="film">
    <div class="film__bg" :style="{ '--background-image': `url('${film.backdrop_path}')` }"></div>
    <div class="film__inner">
      <div class="film__info">
        <div class="film__title h1">{{ film.title }}</div>
        <div class="film__main-info">
          <div class="film__tags">
            <n-tag
              type="success"
              size="large"
              round
            >
              {{ film.vote_average?.toFixed( 1 ) || 0 }}
            </n-tag>
          </div>
          <div class="film__date">
            {{ new Date( film.release_date ).getFullYear() || '' }}
          </div>
          <div class="film__genres">
            <ul
              class="film__genres"
              v-for="( item, index ) in film.genres"
              :key="index"
            >
              <li
                class="film__genres-item h3"
                @click="toGenre( item.id )"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="film__description h2">
          {{ film.overview }}
        </div>
        <div class="film__actions">
          <n-button
            color="#2f9fff"
            size="large"
            @click="showTrailer(true )"
          >
            <BsPlayFill />
            {{ $t( 'button.show_trailer' ) }}
          </n-button>
          <Teleport to="body">
            <video-modal
              :show="isShowModal"
              :video="randomTrailer"
              @close="showTrailer( false )"
            >
              <template #header>
              </template>
            </video-modal>
          </Teleport>
          <Teleport to="body">
            <image-modal
              :show="isShowImageModal"
              :images="imageList"
              @close="showImages( false )"
            >
              <template #header>
              </template>
            </image-modal>
          </Teleport>
          <n-button
            v-if="imageList.length"
            size="large"
            @click="showImages( true )"
          >
            <template #icon>
              <div class="film__images-icon">
                <ClImage01 class="icon-white" />
              </div>
            </template>
          </n-button>
          <n-button
            size="large"
            @click="markFilm"
            :disabled="isFavorite"
          >
            <template #icon>
              <div class="film__bookmark">
                <BsBookmarkFill class="icon-white" />
              </div>
            </template>
          </n-button>
        </div>
      </div>
      <div class="film__tab-panel">
        <swiper
          :breakpoints="breakpoints"
          :navigation="false"
          :slidesPerView="2"
          :spaceBetween="15"
          :centeredSlides="false"
          :zoom="true"
          :scale="1"
          class="film__tabs-swiper"
        >
          <swiper-slide
            class="film__tab-panel-item h2"
            v-for="(_, tab) in tabs"
            :key="tab"
            :class="{'film__tab-panel-item--active': currentTab === tab }"
            @click="currentTab = tab"
          >
            {{ $t( `info.${ tab.toLowerCase() }` ) }}
          </swiper-slide>
        </swiper>
      </div>
      <Transition name="fade" mode="out-in">
        <component
          :is="tabs[currentTab]"
          :film-list="recommendationsList"
          :similar-film-list="similarList"
          :is-loading="isLoading"
          :page="similarListPage"
          :film="film"
          :director="filmDirector"
          :cast="filmCast"
          :crew="filmCrew"
          :is-show-load-button="isShowLoadButton"
          :personList="filmCast"
          :reviews="reviewList"
          @loadFilms="loadFilms"
          @marked-film="markFilm"
        >
        </component>
      </Transition>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";

.film {
  width: 100%;

  &__bg {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0.2;
      background: var(--background-image) lightgray 50% / cover no-repeat;
      z-index: -1;
    }
  }

  &__inner {
    padding: 0 90px;
    color: #f2f2f2;

    @include laptop {
      padding: 0 12px;
    }
  }

  &__info {
    width: 60%;

    @include laptop {
      width: 100%;
    }
  }

  &__title {
    margin: 50px 0 80px;
  }

  &__main-info {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 35px 0;
  }

  &__genres {
    display: flex;
    align-items: center;
  }

  &__genres-item {
    margin: 0 8px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 15px 0;
  }

  &__tab-panel {
    display: flex;
    gap: 30px;
    border-bottom: 2px solid hsla(0, 0%, 85%, .2);

    @include phone_wide {
      flex-direction: column;
    }
  }

  &__tab-panel-item {
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      background: linear-gradient(270deg, rgba(0, 108, 217, .17), rgba(0, 108, 217, 0) .01%, #006cd9 27.08%, #0089ff 51.04%, #006cd9 77.08%, rgba(0, 108, 217, 0));
      bottom: 0;
      height: 2px;
      width: 100%;
      position: absolute;
      transition: 0.2s ease;
      opacity: 0;
    }

    &--active {
      &::before {
        opacity: 1;
      }
    }
  }
}
</style>