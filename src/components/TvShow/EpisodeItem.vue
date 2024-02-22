<script setup>
import { NTag } from 'naive-ui'
import { AnFilledStar } from "@kalimahapps/vue-icons"

const props = defineProps( {
  episode: {
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

  <div class="episode">
    <div class="episode__image">
      <img :src="episode.poster_path || episode.still_path" alt="poster">
    </div>
    <div class="episode__inner">
      <div class="episode__header">
        <div class="episode__header-inner">
          <div class="episode__user-info">
            <div class="episode__user-name h2">
              {{ episode.name }}
            </div>
            <div class="episode__public-info">
              <div class="episode__rating h3" v-if="episode.vote_average > 0">
                <NTag size="large" type="success">
                  <AnFilledStar />
                  {{ episode.vote_average }}
                </NTag>
              </div>
              <div class="episode__created-date">
                {{ new Date( episode.air_date ).getFullYear() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <article class="episode__content">
        <p>
          {{ episode.overview }}
        </p>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
.episode {
  background-color: var(--color-background);
  opacity: 0.8;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(1, 90, 185, 0.62);
  display: flex;
  transition: 0.2s;
  color: #f2f2f2;
  flex: 1 1;
  gap: 18px;

  &:hover {
    background-color: #1d1f2d;
  }

  &__image {
    flex-shrink: 0;
    max-height: 288px;

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