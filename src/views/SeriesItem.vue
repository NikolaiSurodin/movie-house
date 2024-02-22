<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

import { getFilmItem, getTrailers } from '../services/film.service'
import TvShow from '../classes/TvShow'
import { cinemaType } from '../const/cinemaType'
import { showModal } from '../helpers/showModal'
import { NTag, NButton } from 'naive-ui'
import { BsBookmarkFill, BsPlayFill } from "@kalimahapps/vue-icons"

import Details from '../components/TvShow/Details.vue'
import Cast from '../components/film/Cast.vue'
import Seasons from '../components/TvShow/Seasons.vue'
import VideoModal from '../components/modals/VideoModal.vue'
import { $notify } from '../helpers/notify'
import { useFilmStore } from '../stores/filmStore'
import { useMeStore } from '../stores/meStore'

const router = useRoute()

const isLoading = ref( false )
const tabs = {
  Details,
  Cast,
  Seasons
}

onMounted( () => {
  loadFilm()
  loadTrailers()
} )

const currentTab = ref( 'Details' )
const series = ref( {} )
const credits = ref( {
  cast: [],
  crew: []
} )
let trailer = {}
const isShowModal = ref( false )

function showTrailer( value ) {
  isShowModal.value = value
  showModal( value )
}

function loadFilm() {
  getFilmItem(
    router.params.id,
    cinemaType.TV,
    ( data ) => {
      series.value = new TvShow( data )
      credits.value.cast = data.credits.cast
      credits.value.crew = data.credits.crew
      useFilmStore().setSeasonList( series.value.seasons )
    },
    ( err ) => {
      console.log( err )
    }
  )
}

function loadTrailers() {
  getTrailers(
    router.params.id,
    cinemaType.TV,
    ( data ) => {
      const trailers = data.results.filter( el => el.type === 'Trailer' )
      trailer = trailers.length ? trailers[ 0 ] : {}
    },
    ( err ) => {
      console.log( err )
    }
  )
}

function markFilm() {
  if( !useMeStore().getIsLoggedIn ) return

  useFilmStore().addFilmToFavoriteList( series.value.id, true, series.value.media_type )
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
        'Something wrong',
        'error'
      )
    } )
}

</script>

<template>
  <article class="series">
    <div class="series__bg" :style="{ '--background-image': `url('${ series.backdrop_path }')` }"></div>
    <div class="series__inner">
      <div class="series__info">
        <div class="series__title h1">{{ series.name }}</div>
        <div class="series__main-info">
          <div class="series__tags">
            <n-tag type="success" size="large" round>{{ series.vote_average?.toFixed( 1 ) || 0 }}</n-tag>
          </div>
          <div class="series__date">
            {{ new Date( series.first_air_date ).getFullYear() || '' }}
          </div>
          <div class="series__genres">
            <ul
              class="series__genres"
              v-for="( item, index ) in series.genres"
              :key="index"
            >
              <li class="series__genres-item h3">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class="series__description h2">
          {{ series.overview }}
        </div>
        <div class="series__actions">
          <n-button
            color="#2f9fff"
            size="large"
            @click="showTrailer(true )"
            :disabled="!Object.keys( trailer )"
          >
            <BsPlayFill />
            {{ $t( 'button.show_trailer' ) }}
          </n-button>
          <Teleport to="body">
            <video-modal
              :show="isShowModal"
              :video="trailer"
              @close="showTrailer( false )"
            >
              <template #header>
              </template>
            </video-modal>
          </Teleport>
          <n-button
            size="large"
            :disabled="!useMeStore().getIsLoggedIn"
            @click="markFilm"
          >
            <template #icon>
              <div class="series__bookmark">
                <BsBookmarkFill class="icon-white" />
              </div>
            </template>
          </n-button>
        </div>
      </div>
      <ul class="series__tab-panel">
        <li
          class="series__tab-panel-item h2"
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="{'series__tab-panel-item--active': currentTab === tab }"
          @click="currentTab = tab"
        >
          {{ $t( `info.${ tab.toLowerCase() }` ) }}
        </li>
      </ul>
      <Transition name="fade" mode="in-out">
        <component
          :is="tabs[currentTab]"
          :is-loading="isLoading"
          :film="series"
          :cast="credits.cast"
          :crew="credits.crew"
          :personList="credits.cast"
          :seasons="series.seasons"
          :tv-show-id="series.id"
        >
        </component>
      </Transition>
    </div>
  </article>
</template>

<style scoped lang="scss">
.series {
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
  }

  &__info {
    width: 60%;
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
    padding: 10px;
  }

  &__tab-panel-item {
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      background: linear-gradient(270deg, rgba(0, 108, 217, .17), rgba(0, 108, 217, 0) .01%, #006cd9 27.08%, #0089ff 51.04%, #006cd9 77.08%, rgba(0, 108, 217, 0));
      bottom: -12px;
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