<script setup>
import SeriesSeasonItem from './SeriesSeasonItem.vue'
import { CoCalendar } from "@kalimahapps/vue-icons"
import { NTag } from 'naive-ui'

import _ from 'lodash'

import { computed } from 'vue'

const props = defineProps( {
  film: {
    type: Object,
    default: {}
  },
  director: {
    type: Object,
    default: () => ( {} )
  },
  cast: {
    type: Array,
    default: () => ( [] )
  },
  crew: {
    type: Array,
    default: () => ( [] )
  },
} )

const mainInfo = computed( () => {
  return [
    {
      title: 'original_name',
      value: props.film.original_title || props.film.original_name
    },
    {
      title: 'realise_year',
      value: props.film.release_date || props.film.first_air_date

    },
    {
      title: 'genres',
      value: props.film.genres
    },
    {
      title: 'original_language',
      value: props.film.original_language?.toUpperCase()
    }
  ]
} )
const detailInfo = computed( () => {
  return [
    {
      title: 'director',
      value: props.director.name
    },
    {
      title: 'cast',
      value: props.cast

    },
    {
      title: 'rating',
      value: props.film.vote_average?.toFixed( 1 )
    }
  ]
} )
const seasons = computed( () => {
  return _.get( props.film, 'seasons', [] )
} )

const lastSeason = computed( () => {
  return seasons.value[ seasons.value.length - 1 ]
} )

const lastEpisode = computed( () => {
  return _.get( props.film, 'last_episode_to_air', {} )
} )
</script>

<template>
  <article class="details">
    <div class="details__inner">
      <section class="details__description">
        <h1 class="h1">{{ $t( 'info.description' ) }}</h1>
        <p class="details__description-text">{{ props.film.overview }}</p>
        <section class="details__last-season">
          <h1 class="h1">{{ $t( 'title.last_season' ) }}</h1>
          <series-season-item
            :season="lastSeason"
            :tv-show-id="film.id"
          >
            <template #last-episode>
              <CoCalendar />
              <h3 class="h3">{{ lastEpisode.name }}</h3>
              <span>{{ _.get( lastSeason, 'air_date', '' ) }}</span>
              <n-tag type="info">
                Season {{ _.get( lastEpisode, 'episode_type', '' ) }}
              </n-tag>
            </template>
          </series-season-item>
        </section>
      </section>
      <section class="details__info">
        <h1 class="h1">{{ $t( 'info.info' ) }}</h1>
        <div class="details__info__inner">
          <div class="details__info-column">
            <div
              class="details__info-block"
              v-for="( item, index ) in mainInfo"
              :key="index"
            >
              <p class="details__subtitle h3"> {{ $t( `info.${ item.title }` ) }}</p>
              <template v-if="Array.isArray( item.value )">
                <p class="details__point-info h2"
                   v-for="( item, index) in item.value"
                   :key="index"
                >
                  {{ item.name }}
                </p>
              </template>
              <template v-else>
                {{ item.value }}
              </template>
            </div>
          </div>
          <div class="details__info-column">
            <div class="details__info-column">
              <div
                class="details__info-block"
                v-for="( item, index ) in detailInfo"
                :key="index"
              >
                <p class="details__subtitle h3">{{ $t( `info.${ item.title }` ) }}</p>
                <template v-if="Array.isArray( item.value )">
                  <section class="details__cast">
                    <router-link
                      class="details__point-info h2"
                      v-for="( item, index) in item.value"
                      :key="index"
                      :to="`/people/${ item.id }`"
                    >
                      {{ item.name }}
                    </router-link>
                  </section>
                </template>
                <template v-else>
                  {{ item.value }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped lang="scss">
.details {
  &__inner {
    grid-gap: 130px;
    -ms-grid-columns: 1fr 19px 1fr;
    -ms-grid-rows: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid: auto-flow dense/1fr 1fr;
    padding: 60px 0;
  }

  &__description-text, &__info-block {
    padding-top: 40px;
  }

  &__info__inner {
    display: flex;
    gap: 100px;
  }

  &__subtitle {
    opacity: 0.5;
  }

  &__cast {
    display: flex;
    flex-direction: column;
  }
}
</style>