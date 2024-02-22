<script setup>
import { useRouter } from 'vue-router'
import { BsBookmarkFill, IcDeleteCircle } from "@kalimahapps/vue-icons"
import { NTag } from 'naive-ui'
import { useMeStore } from '../stores/meStore'
import { useStore } from '../stores/store'
import { useFilmStore } from '../stores/filmStore'
import { $notify } from '../helpers/notify'
import { computed } from 'vue'

const router = useRouter()
const props = defineProps( {
  film: {
    type: Object,
    default: {}
  },
  minHeight: {
    type: String,
    default: '415px'
  },
  poster: {
    type: String
  },
  title: {
    type: String
  },
  rating: {
    type: Number
  },
  release: {
    type: String
  },
  id: {
    type: Number
  },
  path: {
    type: String,
    default: 'films'
  },
  isHover: {
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
const emit = defineEmits( [ 'markedFilm' ] )

const { session, me } = useMeStore()
const { getMyFavoriteFilmIdList } = useFilmStore()

const isLoggedIn = computed( () => {
  return useMeStore().getIsLoggedIn
} )

function markFilm() {
  if( !isLoggedIn.value ) {
    $notify(
      '',
      'Please, login',
      'warning'
    )
    return
  }
  emit( 'markedFilm' )
}


</script>

<template>
  <router-link
    class="film-card"
    :class="{
    'film-card--hover': isHover,
    'film-card--mask': !isHover,
    'film-card--mobile': useStore().getIsMobile
  }"
    :to="`/${ path }/${ id }`"
    :style="{'min-height': minHeight}"
  >
    <img
      class="film-card__poster"
      :src="poster"
      alt="poster"
      loading="lazy"
    >
    <div
      class="film-card__inner"
      :class="{ 'film-card__inner--hover': isHover }"
    >
      <div
        class="film-card__bookmark"
        @click.prevent="markFilm"
      >
        <BsBookmarkFill class="icon" v-if="isCanAddToFavorite" />
        <IcDeleteCircle class="icon" v-else />
      </div>
      <div class="film-card__title h2">
        {{ title }}
      </div>
      <div class="film-card__tags" v-if="rating">
        <n-tag type="success" size="large" round>{{ rating?.toFixed( 1 ) }}</n-tag>
      </div>
      <div class="film-card__bottom">
        <div class="film-card__date">
          {{ new Date( release ).getFullYear() || '' }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "../assets/styles/mixins";

.film-card {
  background: #2d303b;
  border-radius: 12px;
  height: 100%;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  transition: all .2s ease 0s;
  width: 100%;
  cursor: pointer;
  color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__poster {
    display: block;
    position: absolute;;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    border-radius: 12px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    opacity: 0.5;
    transition: 0.2s;
    z-index: 1;
  }

  &--mask {
    &:before {
      z-index: 1;
      background-color: #424560;
    }
  }

  &--hover {

    &:hover {
      background: #2d303b;
      box-shadow: 0 20px 25px -15px #0f1321;
      transform: scale(1.07);

      &:before {
        background-color: #0f1321;
        z-index: 1;
      }

      .film-card__bookmark, .film-card__inner {
        opacity: 1;
      }
    }
  }

  &--mobile {
    background: #2d303b;
    box-shadow: 0 20px 25px -15px #0f1321;

    &:before {
      background-color: rgba(14, 7, 7, 0.45);
      z-index: 1;
    }

    .film-card__bookmark, .film-card__inner {
      opacity: 1;
    }
  }

  &__inner {

    &--hover {
      opacity: 0;
    }

    opacity: 1;
    transition: 0.2s;
    z-index: 1;
    padding: 5px 12px;
  }

  &__bottom {
    display: flex;
    gap: 18px;
  }

  &__bookmark {
    position: absolute;
    top: 3px;
    right: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: 0.2s;

    .icon {
      color: #ffffff;
      font-size: 1.3em;
      margin-right: 0.5em;
    }
  }
}
</style>