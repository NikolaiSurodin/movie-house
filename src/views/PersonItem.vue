<script setup>
import { ref, onMounted, defineAsyncComponent, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Person from '../classes/Person'
import {
  getPerson,
  getImagesByPerson,
  getCreditsByPerson,
  getSocialMediaByPerson,
} from '../services/person.service'
import Image from '../classes/Image'
import Film from '../classes/Film'
import tvShow from '../classes/TvShow'
import { genderCode } from '../dict/genderCode'
import { NSpin } from 'naive-ui'
import {
  CaZoomArea,
  IoLogoFacebook,
  AnOutlinedInstagram,
  BxTiktok,
  AkTwitterFill
} from "@kalimahapps/vue-icons"
import ImageModal from '../components/modals/ImageModal.vue'
import { showModal } from '../helpers/showModal'
import CardSlider from '../components/sliders/CardSlider.vue'
import { $notify } from '../helpers/notify'
import { cinemaType } from '../const/cinemaType'
import { useFilmStore } from '../stores/filmStore'
import { useStore } from '../stores/store'
import { scrollTo } from '../helpers/scrollTo'

const route = useRoute()
const person = ref( {} )
const isLoading = ref( false )

const currentTab = ref( '' )
const tabs = {
  'FILMS': 'films',
  'TV': 'films'
}

const FilmsPopular = defineAsyncComponent( () =>
  import('../components/people/Credits.vue')
)
const socialIcons = {
  'facebook': IoLogoFacebook,
  'instagram': AnOutlinedInstagram,
  'tiktok': BxTiktok,
  'twitter': AkTwitterFill
}

onMounted( () => {
  loadPerson()
  loadImages()
  loadCredits( cinemaType.MOVIE )
  loadCredits( cinemaType.TV )
  loadSocialMedia()
} )

const sliderBreakPoints = {
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
    slidesPerView: 2,
  },
  950: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1224: {
    slidesPerView: 4,
  },
  1441: {
    slidesPerView: 5,
  },
}

const personInfo = ref( [] )

function loadPerson() {
  isLoading.value = true
  getPerson(
    route.params.id,
    ( data ) => {
      person.value = new Person( data )
      isLoading.value = false
      personInfo.value = [
        {
          title: 'Known For',
          description: person.value.known_for_department,
        },
        {
          title: 'Gender',
          description: genderCode[ person.value.gender ],
        },
        {
          title: 'Birthday',
          description: person.value.birthday,
        },
        {
          title: 'Place of Birth',
          description: person.value.place_of_birth,
        },
      ]
    },
    () => {
      isLoading.value = false
    }
  )
}

const imageList = ref( [] )

function loadImages() {
  getImagesByPerson(
    route.params.id,
    ( data ) => {
      imageList.value = data.profiles.map( el => new Image( el ) )
    },
    () => {
    }
  )
}

const isShowModal = ref( false )

function openModal( value ) {
  if( imageList.value.length ) {
    isShowModal.value = value
    showModal( value )
  }
}

const creditsFilmList = ref( [] )
const creditsTvShowList = ref( [] )
const isLoadingCredits = ref( false )

function loadCredits( key ) {
  isLoadingCredits.value = true
  getCreditsByPerson(
    route.params.id,
    key,
    ( data ) => {
      if( key === cinemaType.MOVIE ) {
        creditsFilmList.value = data.cast.map( el => new Film( el ) )
      } else {
        creditsTvShowList.value = data.cast.map( el => new tvShow( el ) )
      }
      isLoadingCredits.value = false
    },
    () => {
      isLoadingCredits.value = false
    },
  )
}

const socialMedia = ref( {} )

function loadSocialMedia() {
  getSocialMediaByPerson(
    route.params.id,
    ( data ) => {
      const keysToCheck = [ "facebook_id", "instagram_id", "tiktok_id", "twitter_id" ]
      socialMedia.value = keysToCheck.reduce( ( result, key ) => {
        if( data[ key ] !== null && data[ key ] !== '' ) {
          const formattedKey = `${ key.replace( '_id', '' ).charAt( 0 ) }${ key.slice( 1, key.length - 3 ) }`
          result[ formattedKey ] = {
            path: `https://www.${ formattedKey }.com/${ data[ key ] }`,
            key: formattedKey
          }
        }
        return result
      }, {} )
    },
    () => {
    },
  )
}

function markFilm( id, isCanToAddToFavorite, mediaType ) {
  useFilmStore().addFilmToFavoriteList(
    id,
    isCanToAddToFavorite,
    mediaType
  )
    .then( () => {
      $notify(
        '',
        isCanToAddToFavorite ? 'notification.add_film' : 'notification.remove_film',
        'success'
      )
    } )
    .catch( () => {
      $notify(
        '',
        'error',
        'error'
      )
    } )
}

function setTab( tab ) {
  currentTab.value = tab
  if( !useStore().getIsMobile ) {
    nextTick( () => {
      scrollTo( { top: 1000 } )
    } )
  }
}

</script>

<template>
  <div class="loading" v-if="isLoading">
    <n-spin />
  </div>
  <article class="person" v-else>
    <div class="person__bg"></div>
    <div class="person__inner">
      <div class="person__info">
        <div class="person__title h1">{{ person.name }}</div>
        <div class="person__main-info">
          <div class="person__info-left-side">
            <div
              class="person__image"
              @click="openModal(true)"
            >
              <img :src="person.profile_path" alt="photo">
              <CaZoomArea class="person__image-icon" />
              <Teleport to="body">
                <image-modal
                  :show="isShowModal"
                  :images="imageList"
                  @close="openModal( false )"
                >
                  <template #header>
                  </template>
                </image-modal>
              </Teleport>
            </div>
            <ul class="person__social">
              <li
                class="person__social-icon"
                v-for="( social, index ) in socialMedia"
                :key="index"
              >
                <a :href="social.path" target="_blank">
                  <component :is="socialIcons[social.key]" />
                </a>
              </li>
            </ul>
            <div class="person__person-info">
              <ul>
                <li
                  class="person__person-info-item"
                  v-for="(item, index) in personInfo"
                  :key="index"
                >
                  <span class="h3">{{ item.title }}:</span>
                  <span class="h3">{{ item.description }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="person__info-right-side">
            <div class="person__description h3">
              {{ person.biography || $t( 'text.no_biography_on_lang' ) }}
            </div>
            <h1 class="h1">Known For:</h1>
            <div class="person__interesting-films">
              <template v-if="isLoadingCredits">
                <n-spin size="large" />
              </template>
              <card-slider
                v-else
                :items="creditsFilmList.slice( 0,10 )"
                :is-film="true"
                :slides-per-view="5"
                :breakpoints="sliderBreakPoints"
                height="450px"
                @markedFilm="markFilm"
              />
            </div>
          </div>
        </div>
      </div>
      <ul class="person__tab-panel">
        <li
          class="person__tab-panel-item h2"
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="{'person__tab-panel-item--active': currentTab === tab }"
          @click="setTab( tab )"
        >
          {{ $t( `info.${ tab.toLowerCase() }` ) }}
        </li>
      </ul>
      <FilmsPopular
        v-if="currentTab === 'FILMS'"
        :items="creditsFilmList"
        @markedFilm="markFilm"
      />
      <FilmsPopular
        v-if="currentTab === 'TV'"
        :items="creditsTvShowList"
        @markedFilm="markFilm"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";

.person {
  width: 100%;

  @include phone_wide {
    padding-bottom: 150px;
  }

  &__inner {
    padding: 30px 90px;
    color: #f2f2f2;

    @include laptop {
      padding: 30px 12px;
    }
  }

  &__title {
    margin: 50px 0 80px;

    @include phone_wide {
      margin: 0 0 20px;
    }
  }

  &__main-info {
    display: flex;
    gap: 30px;

    @include laptopsmall {
      flex-direction: column;
    }
  }

  &__image {
    width: 280px;
    height: 415px;
    border-radius: 8px;
    flex-shrink: 0;
    position: relative;

    @include phone_logos {
      width: 100%;
    }

    &:before {
      content: '';
      position: absolute;;
      width: 100%;
      height: 100%;
      transition: .2s;
    }

    &:hover {
      cursor: pointer;

      &:before {
        background-color: #0f1321;
        opacity: 0.8;
      }

      .person__image-icon {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  &__social {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    gap: 18px;

    @include laptopsmall {
      display: block;
      width: 10%;
    }

    @include phone_logos {
      display: flex;
      width: 100%;
    }
  }

  &__social-icon {
    font-size: 25px;
  }

  &__image-icon {
    color: #f2f2f2;
    font-size: 65px;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: .2s;
  }

  &__person-info {
    width: 100%;
  }

  &__person-info-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 35px 0;
  }

  &__genres {
    display: flex;
    align-items: center;
  }

  &__genres-item {
    margin: 0 8px;
  }

  &__description {
    margin: 15px 0;
  }

  &__interesting-films {
    display: flex;
    justify-content: center;
  }

  &__tab-panel {
    display: flex;
    gap: 30px;
    border-bottom: 2px solid hsla(0, 0%, 85%, .2);
    padding: 10px;
  }

  &__tab-panel-item {
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      background: linear-gradient(270deg, rgba(0, 108, 217, .17), rgba(0, 108, 217, 0) .01%, #006cd9 27.08%, #0089ff 51.04%, #006cd9 77.08%, rgba(0, 108, 217, 0));
      bottom: -12px;
      height: 2px;
      width: 100%;
      position: absolute;
      transition: 0.2s ease;
      opacity: 0;
    }

    &--active {
      &::before {
        opacity: 1;
      }
    }
  }

  &__info-right-side {
    width: 80%;

    @include laptop {
      width: 72%;
    }

    @include laptopsmall {
      width: 100%;
    }
  }

  &__info-left-side {
    width: 20%;

    @include laptopsmall {
      width: 100%;
      display: flex;
    }

    @include phone_logos {
      display: block;
    }
  }
}
</style>