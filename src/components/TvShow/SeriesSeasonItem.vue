<script setup>
import { NTag } from 'naive-ui'
import { AnFilledStar } from "@kalimahapps/vue-icons"

const props = defineProps( {
  season: {
    type: Object,
    default: () => ( {} )
  },
  tvShowId: {
    type: Number,
    default: 0
  }
} )
</script>

<template>

  <router-link :to="`/tv-shows/${ tvShowId }/season/${ season.season_number }`" class="season">
    <div class="season__image">
      <img :src="season.poster_path || season.still_path" alt="poster">
    </div>
    <div class="season__inner">
      <div class="season__header">
        <div class="season__header-inner">
          <div class="season__user-info">
            <div class="season__user-name h2">
              {{ season.name }}
            </div>
            <div class="season__public-info">
              <div class="season__rating h3" v-if="season.vote_average > 0">
                <NTag size="large" type="success">
                  <AnFilledStar />
                  {{ season.vote_average }}
                </NTag>
              </div>
              <div class="season__created-date">
                {{ new Date( season.air_date ).getFullYear() }} <span class="dot">•</span> {{ season.episode_count }} Episodes
              </div>
            </div>
          </div>
        </div>
      </div>
      <article class="season__content">
        {{ season.overview }}
      </article>
      <div class="season__last-episode">
        <slot name="last-episode"></slot>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.season {
  background-color: var(--color-background);
  opacity: 0.8;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(1, 90, 185, 0.62);
  display: flex;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #1d1f2d;
  }

  &__image {
    height: 150px;
    width: 150px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__header-inner {
    display: flex;
  }

  &__user-info {
  }

  &__public-info {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 8px 0;
  }

  &__user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;


    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid saddlebrown;
      object-fit: cover;
    }
  }
  &__last-episode {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 0;
  }
}
</style>