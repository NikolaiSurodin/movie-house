import { ref } from 'vue'
import { getFilmList } from '../services/film.service'
import { scrollTo } from '../helpers/scrollTo'

const isLoading = ref( false )
const filmList = ref( [] )
const currentPage = ref( 1 )


export function useLoadFilmList( key, params, callback ) {
  getFilmList(
    key,
    { ...params },
    ( data ) => {
      isLoading.value = true
      filmList.value = data.data.results
      currentPage.value = data.data.page
      isLoading.value = false
      scrollTo( { top: 0 } )
      callback()
    },
    ( err ) => {
    }
  )

  return { filmList, currentPage, isLoading }
}