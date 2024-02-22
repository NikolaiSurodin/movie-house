<template>
  <swiper
    :navigation="true"
    :slidesPerView="slidesPerView"
    :spaceBetween="15"
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
      <person-card
        :person="item"
        @clickOnCard="$emit( 'clickOnCard', item.id )"
      />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/navigation'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules'
import PersonCard from '../people/PersonCard.vue'

export default {
  components: {
    PersonCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [ Pagination, Navigation ],
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
      default: '500px'
    },
    isCanAddToFavorite: {
      type: Boolean,
      default: true
    },
    slidesPerView: {
      type: Number,
      default: 7
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