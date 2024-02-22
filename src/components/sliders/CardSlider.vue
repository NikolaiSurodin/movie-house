<template>
  <swiper
    :navigation="true"
    :slidesPerView="slidesPerView"
    :spaceBetween="15"
    :breakpoints="breakpoints"
    :centeredSlides="false"
    :zoom="true"
    :scale="1"
    :modules="modules"
    class="mySwiper"
    :style="{ '--height': height }"
  >
    <swiper-slide
      v-for="( item, index ) in items"
      :key="index"
    >
      <template v-if="!isFilm">
        <small-card
          :title="item.name"
          :image-path="item.image"
          :id="item.id"
          @clickOnCard="$emit( 'clickOnCard', item.id )"
        />
      </template>
      <template v-else>
        <film-card
          :title="item.title || item.name"
          :release="item.release_date || item.first_air_date"
          :rating="item.vote_average"
          :poster="item.poster_path"
          :id="item.id"
          :is-can-add-to-favorite="isCanAddToFavorite"
          :media-type="item.media_type"
          :path="path"
          @filtered-favorite-film-list="$emit( 'filteredFavoriteFilmList', item.id )"
          @load-favorite-film-list="$emit( 'loadFavoriteFilmList' )"
          @marked-film="$emit( 'markedFilm', item.id, isCanAddToFavorite, item.media_type )"
        />
      </template>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/navigation'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import SmallCard from '../cards/SmallCard.vue'
import FilmCard from '../FilmCard.vue'

export default {
  components: {
    FilmCard,
    SmallCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [ Pagination, Navigation ]
    }
  },
  props: {
    items: {
      type: Array,
      default: () => ( [] )
    },
    title: {
      type: String,
      default: ''
    },
    imagePath: {
      type: String,
      default: ''
    },
    isFilm: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '220px'
    },
    isCanAddToFavorite: {
      type: Boolean,
      default: true
    },
    path: {
      type: String,
      default: 'films'
    },
    slidesPerView: {
      type: Number,
      default: 7
    },
    breakpoints: {
      type: Object,
      default: {
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
          slidesPerView: 7,
        },
      }
    }
  }
}
</script>

<style lang="scss">
.swiper {
  width: 100%;
  height: var(--height);
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: inherit;
  padding: 20px 0;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>