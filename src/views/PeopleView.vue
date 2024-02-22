<script setup>
import { ref, onMounted } from 'vue'
import { getPopularPeople } from '../services/person.service'
import Person from '../classes/Person'
import { scrollTo } from '../helpers/scrollTo'
import PersonCard from '../components/people/PersonCard.vue'
import { NPagination, NSpin, NButton } from 'naive-ui'


onMounted( () => {
  loadPeople( currentPage.value )
} )

const people = ref( [] )
const isLoading = ref( false )

function loadPeople( page ) {
  isLoading.value = true
  getPopularPeople(
    {
      page: page
    },
    ( data ) => {
      people.value = data.results.map( el => new Person( el ) )
      isLoading.value = false
      scrollTo( { top: 0 } )
    },
    () => {
    }
  )
}

const currentPage = ref( 1 )

function changePage( page ) {
  currentPage.value = page
  loadPeople( currentPage.value )
}
</script>

<template>
  <div class="people">
    <section class="people__title">
      <h1 class="h1">{{ $t( 'title.people' ) }}</h1>
    </section>
    <section class="people__loading" v-if="isLoading">
      <NSpin size="large" />
    </section>
    <div class="people__inner" v-else>
      <person-card
        v-for="item in people"
        :key="item.id"
        :person="item"
      />
    </div>
    <section class="people__pagination">
      <n-pagination
        :on-update:page="changePage"
        :page="currentPage"
        :page-count="100"
        size="large"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.people {

  &__title {
    padding: 20px 100px;
    color: #f2f2f2;
  }
  &__inner {
    display: grid;
    grid-template-columns: repeat(5, 280px);
    gap: 30px;
    grid-template-rows: auto;
    justify-content: center;
    padding: 30px 0;
    margin: 0 auto;
    width: auto;
    position: relative;
  }

  &__loading {
    height: calc(100vh - 400px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__pagination {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 100px 0;
  }
}
</style>