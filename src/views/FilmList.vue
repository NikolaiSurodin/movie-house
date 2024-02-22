<script setup>
import FilmCard from '../components/FilmCard.vue'
import NotFound from '../components/NotFound.vue'
import { NPagination, NSpin, NButton } from 'naive-ui'
import { computed, ref, watchEffect } from 'vue'

import { FlFilledIOsArrowRtl } from "@kalimahapps/vue-icons"

const props = defineProps( {
  filmList: {
    type: Array,
    default: () => ( [] )
  },
  page: {
    type: Number,
    default: 1
  },
  notFoundText: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isPaging: {
    type: Boolean,
    default: true
  },
  isLoadButton: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Number,
    default: 3
  },
  path: {
    type: String,
    default: 'films'
  },
  isNextPagePanel: {
    type: Boolean,
    default: true
  },
  isCanAddToFavorite: {
    type: Boolean,
    default: true
  },
  mediaType: {
    type: String,
    default: ''
  }
} )
const emit = defineEmits( [ 'changePage', 'loadFilms', 'markedFilm' ] )

const isShowButton = ref( false )
const button = ref( null )

watchEffect( () => {
  if( button.value ) {
    initIntersectionObserver()
  }
} )

function changePage( page ) {
  emit( 'changePage', page )
}

function nextPage() {
  let page = props.page
  page++
  changePage( page )
}

function initIntersectionObserver() {
  const options = {
    rootMargin: '-25px 0px 45px',
    threshold: 0
  }
  const callback = ( entries ) => {
    entries.forEach( ( entry ) => {
      if( entry.isIntersecting ) {
        isShowButton.value = true
      }
    } )
  }
  const observer = new IntersectionObserver( callback, options )
  observer.observe( button.value )
}

const normalizeList = computed( () => {
  const list = props.filmList.map( el => {
    return {
      id: el.id,
      poster: el.poster_path || el.profile_path,
      rating: el.vote_average,
      title: el.title || el.name,
      realise: el.release_date || el.first_air_date
    }
  } )
  return list
} )

function markedFilm( id ) {
  emit( 'markedFilm', id )
}

</script>

<template>
  <div class="film-list">
    <template v-if="isLoading">
      <div class="film-list__loading">
        <n-spin />
      </div>
    </template>
    <template v-else-if="filmList.length">
      <section
        class="film-list__inner"
        :style="{ '--columns': columns }"
      >
        <film-card
          v-for="item in normalizeList"
          :key="item.id"
          :film="item"
          :poster="item.poster"
          :rating="item.rating"
          :release="item.realise"
          :title="item.title"
          :id="item.id"
          :path="path"
          :is-can-add-to-favorite="isCanAddToFavorite"
          :media-type="mediaType"
          @marked-film="markedFilm( item.id )"
        />
        <div
          class="film-list__next-page-block"
          v-if="isNextPagePanel"
          title="next page"
          @click="nextPage"
        >
          <FlFilledIOsArrowRtl class="icon" />
        </div>
      </section>
      <section
        class="film-list__pagination"
        v-if="isPaging"
      >
        <n-pagination
          :on-update:page="changePage"
          :page="page"
          :page-count="100"
          size="large"
        />
      </section>
      <template v-if="isLoadButton">
        <section
          class="film-list__load-button"
          :class="{ 'film-list__load-button--show': isShowButton }"
          ref="button"
        >
          <n-button
            type="success"
            @click="emit( 'loadFilms' )"
          >
            {{ $t( 'button.load_films' ) }}
          </n-button>
        </section>
      </template>
    </template>
    <template v-else>
      <not-found
        class="film-list__not-found"
        :text="notFoundText"
      />
    </template>
  </div>

</template>

<style lang="scss" scoped>
.film-list {
  margin: 50px 0;

  &__inner {
    display: grid;
    grid-template-columns: repeat( auto-fill, 280px);
    gap: 30px;
    grid-template-rows: auto;
    justify-content: center;
    padding: 30px 0;
    margin: 0 auto;
    width: auto;
    position: relative;
  }

  &__next-page-block {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
    color: transparent;
    background-color: transparent;
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    right: 0;
    transition: 0.4s;
    opacity: 0.2;
    border-radius: 8px;
    margin: 30px 0;
    cursor: pointer;

    &:hover {
      background-color: #000;
      color: #007aff;
    }
  }

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px 0;
  }

  & &__pagination {
    display: flex;
    justify-content: center;
    margin: 45px 0;
  }

  &__not-found {
    padding: 30px;
  }

  &__load-button {
    display: flex;
    width: 100%;
    justify-content: center;
    opacity: 0;
    transition: 0.3s;

    &--show {
      opacity: 1;
    }
  }

}
</style>