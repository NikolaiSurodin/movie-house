<script setup>
import { computed } from 'vue'
import { NCollapse, NCollapseItem } from 'naive-ui'

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
      value: props.film.original_title
    },
    {
      title: 'realise_year',
      value: props.film.release_date

    },
    {
      title: 'genres',
      value: props.film.genres
    },
    {
      title: 'original_language',
      value: props.film.original_language
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
</script>

<template>
  <article class="details">
    <div class="details__inner">
      <section class="details__description">
        <h1 class="h1">{{ $t( 'info.description' ) }}</h1>
        <p class="details__description-text">{{ film.overview }}</p>
      </section>
      <section class="details__info">
        <h1 class="h1">{{ $t( 'info.info' ) }}</h1>
        <div class="details__info__inner">
          <div class="details__info-column details__info-column-left">
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
                <p class="h2">{{ item.value }}</p>
              </template>
            </div>
          </div>
          <div class="details__info-column">
            <div
              class="details__info-block"
              v-for="( item, index ) in detailInfo"
              :key="index"
            >
              <p class="details__subtitle h3">{{ $t( `info.${ item.title }` ) }}</p>
              <template v-if="Array.isArray( item.value )">
                <div class="details__cast--mobile">
                  <n-collapse>
                    <n-collapse-item
                      name="cast"
                    >
                      <div class="details__cast--mobile">
                        <router-link
                          class="details__point-info h2"
                          v-for="( item, index) in item.value"
                          :key="index"
                          :to="`/people/${ item.id }`"
                        >
                          {{ item.name }}
                        </router-link>
                      </div>
                    </n-collapse-item>

                  </n-collapse>
                </div>
                <div class="details__cast">
                  <router-link
                    class="details__point-info h2"
                    v-for="( item, index) in item.value"
                    :key="index"
                    :to="`/people/${ item.id }`"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </template>
              <template v-else>
                <p class="h2">{{ item.value }}</p>
              </template>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import "../../assets/styles/mixins";

.details {
  &__inner {
    grid-gap: 130px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid: auto-flow dense/1fr 1fr;
    padding: 60px 0;

    @include tablet {
      grid-gap: 50px;
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__description-text, &__info-block {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    font-size: 18px;
  }

  &__info__inner {
    display: flex;
    gap: 100px;

    @include tablet {
      justify-content: space-around;
    }

    @include phone_wide {
      gap: 10px;
    }
  }

  &__info-column-left {
    flex-shrink: 0;

    @include phone_wide {
      width: 50%;
    }
  }

  &__info-column {
    @include phone_wide {
      width: 50%;
    }
  }

  &__subtitle {
    opacity: 0.5;
  }

  &__point-info {
    @include phone_wide {
      padding: 8px 0;
    }
  }

  &__cast {
    display: flex;
    flex-direction: column;

    @include phone_wide {
      display: none;
    }

    &--mobile {
      display: none;

      @include phone_wide {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>