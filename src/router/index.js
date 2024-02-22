import { createRouter, createWebHistory } from 'vue-router'
import { useMeStore } from '../stores/meStore'
import FilmItem from '../views/FilmItem.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/films',
      name: 'films',
      component: () => import('../views/FilmsView.vue')
    },
    {
      path: '/tv-shows',
      name: 'tvShows',
      component: () => import('../views/TVShows.vue')
    },
    {
      path: '/tv-shows/:id',
      name: 'tvShow',
      component: () => import('../views/SeriesItem.vue')
    },
    {
      path: '/tv-shows/:tvId/season/:id',
      name: 'season',
      component: () => import('../views/SeasonView.vue')
    },
    {
      path: '/films/:id',
      name: 'filmCard',
      component: FilmItem
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('../views/MyCollectionView.vue'),
      meta: {
        auth: true
      },
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../views/PeopleView.vue')
    },
    {
      path: '/people/:id',
      name: 'person',
      component: () => import('../views/PersonItem.vue')
    }
  ],
  scrollBehavior( to, from, savedPosition ) {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        resolve( { left: 0, top: 0 } )
      }, 500 )
    } )
  },
} )
router.beforeEach( ( to, from ) => {
  const store = useMeStore()
  if( to.meta.auth && !store.getIsLoggedIn ) {
    return {
      path: '/',
    }
  }
} )

export default router
