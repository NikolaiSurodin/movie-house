<script setup>
import { ChMenuHamburger } from "@kalimahapps/vue-icons"
import { NButton, NSelect } from 'naive-ui'
import { AkSearch, BsTrash, AkArrowBackThickFill } from "@kalimahapps/vue-icons"


const props = defineProps( {
  genres: {
    type: Array,
    default: () => ( [] )
  },
  keyWords: {
    type: Array,
    default: () => ( [] )
  },
  isShowBar: {
    type: Boolean,
    default: false
  }
} )
const emit = defineEmits( [
  'toggleBar',
  'setGenre',
  'searchKeyWord',
  'setActiveKeyWords',
  'search',
  'clearParams'
] )

function toggleBar() {
  emit( 'toggleBar' )
}
function setGenre( genre ) {
  emit( 'setGenre', genre )
}

function handleSearch( value ) {
  emit( 'searchKeyWord', value )
}

function setActiveKeyWords( value ) {
  emit( 'setActiveKeyWords', value )
}

</script>

<template>
  <div class="filter-side-bar">
    <div
      class="filter-side-bar__icon"
      @click="toggleBar"
    >
      <ChMenuHamburger />
    </div>
    <div
      class="filter-side-bar__bar"
      :class="{ 'filter-side-bar__bar--show': isShowBar }"
    >
      <div
        class="filter-side-bar__header"
        @click="toggleBar"
      >
        <AkArrowBackThickFill class="filter-side-bar__close-icon" />
      </div>
      <section class="filter-side-bar__block">
        <h3 class="h3 opacity-05 filter-side-bar__block-title">Genres</h3>
        <ul class="filter-side-bar__genres">
          <li
            class="filter-side-bar__genre-item h3"
            :class="{ 'filter-side-bar__genre-item--active': item.isActive }"
            v-for="( item, index ) in props.genres"
            :key="index"
            @click="setGenre( item )"
          >
            {{ item.name }}
          </li>
        </ul>
      </section>
      <section class="filter-side-bar__search">
        <n-select
          multiple
          filterable
          placeholder="Key words"
          :options="keyWords"
          clearable
          remote
          :clear-filter-after-select="false"
          @search="handleSearch"
          @update-value="setActiveKeyWords"
        />
      </section>
      <div class="filter-side-bar__bottom">
        <n-button
          strong
          secondary
          type="success"
          @click="emit( 'search' )"
        >
          <AkSearch />
          Search
        </n-button>
        <n-button
          strong
          secondary
          type="warning"
          @click="emit( 'clearParams' )"
        >
          Clear
          <BsTrash />
        </n-button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/mixins";

.filter-side-bar {
  position: fixed;
  top: 80px;
  left: 100px;
  width: 290px;
  z-index: 10;

  @include ipadpro {
    left: 10px;
  }

  &__icon {
    color: #f2f2f2;
    font-size: 36px;
    width: 100%;
    cursor: pointer;
  }

  &__bar {
    max-width: 396px;
    right: 0;
    top: 0;
    transition: .4s;
    width: 100%;
    z-index: 1050;
    position: absolute;
    color: #f2f2f2;
    height: calc(100vh - 100px);
    min-height: 400px;
    transform: translateX(-150%);
    padding: 12px;
    background-color: var(--color-background);
    border-radius: 8px;

    &--show {
      transform: translateX(0);
    }
  }

  &__header {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  &__close-icon {
    cursor: pointer;
  }

  &__block-title {
    margin-bottom: 15px;
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 25px;
  }

  &__genre-item {
    cursor: pointer;
    padding: 1px 10px;
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    margin: 5px;

    &--active {
      border: 1px solid rgba(14, 255, 155, 0.27);
    }
  }

  &__search {
    margin-bottom: 25px;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>