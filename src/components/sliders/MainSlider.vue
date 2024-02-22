<template>
  <swiper
    :navigation="true"
    :slidesPerView="1.2"
    :centeredSlides="true"
    :spaceBetween="30"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="( item, index ) in items"
      :key="item.id"
    >
      <film-card
        :title="item.title"
        :id="item.id"
        :poster="item.backdrop_path"
        :rating="item.vote_average"
        :release="item.release_date"
        :is-hover="false"
      />
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import FilmCard from '../FilmCard.vue'

export default {
  components: {
    FilmCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [ Pagination, Navigation ],
    };
  },
  props: {
    items: {
      type: Array,
      default: () => ( [] )
    },
  }
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
