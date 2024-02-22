<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps( {
  person: {
    type: Object,
    default: () => ({})
  },
  minHeight: {
    type: String,
    default: '415px'
  },
  path: {
    type: String,
    default: 'people'
  },
  isHover: {
    type: Boolean,
    default: true
  },
} )

</script>

<template>
  <router-link
    class="person-card"
    :class="{
    'person-card--hover': isHover,
    'person-card--mask': !isHover
  }"
    :to="`/${ path }/${ person.id }`"
    :style="{ 'min-height': minHeight }"
  >
    <img
      class="person-card__poster"
      :src="person.profile_path"
      alt="poster"
      loading="lazy"
    >
    <div
      class="person-card__inner"
      :class="{ 'person-card__inner--hover': isHover }"
    >
      <div class="person-card__title h2">
        {{ person.name }}
      </div>
      <div class="person-card__bottom">
        <div class="person-card__date">
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.person-card {
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

      .person-card__bookmark, .person-card__inner {
        opacity: 1;
      }
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