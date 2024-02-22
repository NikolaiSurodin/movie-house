<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilmStore } from '../stores/filmStore'
import { getFilmItem } from '../services/film.service'
import { cinemaType } from '../const/cinemaType'
import Season from '../classes/Season'
import { getSeasonItem } from '../services/film.service'
import { BsArrowRightShort, AkArrowLeft } from "@kalimahapps/vue-icons"
import { NSpin } from 'naive-ui'
import i18n from "@/i18n"

import EpisodeItem from '../components/TvShow/EpisodeItem.vue'
import TvShow from '../classes/TvShow'

const route = useRoute()
const router = useRouter()

const series = ref( {} )
const season = ref( {} )

const isLoading = ref( false )

onMounted( () => {
  if( !useFilmStore().seasonList.length ) {
    loadSeries()
  } else {
    loadSeason()
  }
} )

function loadSeason() {
  isLoading.value = true
  getSeasonItem(
    route.params.tvId,
    route.params.id,
    ( data ) => {
      season.value = new Season( data )
      isLoading.value = false
    },
    () => {
    },
  )
}

function loadSeries() {
  isLoading.value = true
  getFilmItem(
    route.params.tvId,
    cinemaType.TV,
    ( data ) => {
      series.value = new TvShow( data )
      useFilmStore().setSeasonList( series.value.seasons )
      loadSeason()
    },
    ( err ) => {
      console.log( err )
    }
  )
}


const currentSeasonIndex = computed( () => {
  return useFilmStore().seasonList.findIndex( el => el.season_number === season.value.season_number )
} )
const nextSeason = computed( () => {
  return useFilmStore().seasonList[ currentSeasonIndex.value + 1 ]
} )

const prevSeason = computed( () => {
  return useFilmStore().seasonList[ currentSeasonIndex.value - 1 ]
} )

const seasonName = ( season ) => {
  return season.season_number > 0 ? `${ i18n.global.t( 'text.season' ) } ${ season.season_number }` : `${ season.name }`
}

</script>

<template>
  <div class="season">
    <div class="season__inner">
      <section class="season__header">
        <div class="season__header-inner">
          <div class="season__header-top">
            <template v-if="isLoading">
              <n-spin />
            </template>
            <template v-else>
              <div class="season__header-image">
                <img :src="season.poster_path" alt="poster">
              </div>
              <section class="season__info">
                <h1 class="h1 season__title">
                  {{ season.name }}
                </h1>
                <div
                  class="season__back-button-navigation"
                  @click="router.push(`/tv-shows/${ route.params.tvId }`)"
                >
                  <AkArrowLeft />
                  <span>{{ $t( 'text.back_to_series' ) }}</span>
                </div>
              </section>
            </template>
          </div>
        </div>
      </section>
      <section class="season__list">
        <div class="season__header-navigation">
          <router-link
            class="season__header-navigation-item season__header-navigation-item--prev"
            v-if="prevSeason"
            :to="`/tv-shows/${ route.params.tvId }/season/${ prevSeason?.season_number }`"
          >
            <n-spin v-if="isLoading" />
            <template v-else>
              <BsArrowRightShort class="season__header-navigation-icon season__header-navigation-icon--prev" />
              <h2 class="h2">{{ seasonName( prevSeason ) }}</h2>
            </template>
          </router-link>
          <router-link
            class="season__header-navigation-item season__header-navigation-item--next"
            v-if="nextSeason"
            :to="`/tv-shows/${ route.params.tvId }/season/${ nextSeason?.season_number }`"
          >
            <n-spin v-if="isLoading" />
            <h2 class="h2" v-else>{{ $t( 'text.season' ) }} {{ nextSeason?.season_number }}</h2>
            <BsArrowRightShort class="season__header-navigation-icon" />
          </router-link>
        </div>
        <template v-if="isLoading">
          <n-spin />
        </template>
        <template v-else>
          <h2 class="h2 season__list-title">{{ $t( 'text.episodes' ) }} {{ season?.episodes?.length }}</h2>
          <episode-item
            v-for="item in season.episodes"
            :key="item.id"
            :episode="item"
          />
        </template>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.season {
  &__header {
    color: #f2f2f2;
  }

  &__header-inner {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  &__header-top {
    display: flex;
    height: 150px;
    background-color: #1d1f2d;
  }

  &__header-image {
    width: 150px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__back-button-navigation {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  &__header-navigation {
    position: sticky;
    top: 93px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(1, 90, 185, 0.62);
    margin: 20px auto;
    background-color: #1d1f2d;
    padding: 10px;
    max-width: 1200px;
    width: 100%;
  }

  &__header-navigation-item {
    display: flex;
    align-items: center;
  }

  &__header-navigation-icon {
    font-size: 24px;

    &--prev {
      transform: rotate(180deg);
    }
  }

  &__list {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 50px 12px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__list-title {
    color: #f2f2f2;
  }
}
</style>