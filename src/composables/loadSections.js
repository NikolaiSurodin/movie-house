import { ref } from 'vue'
import {
  getTopFilms,
  getPopularFilms,
  getUpcomingFilms,
  getNowPlayingFilms
} from '../services/film.service'
import { cinemaType } from '../const/cinemaType'
import Film from '../classes/Film'

const playingNow = ref( [] )
const topRatingFilmList = ref( [] )
const popularFilmList = ref( [] )
const popularSeriesList = ref( [] )
const upcomingFilmList = ref( [] )

export function useLoadNowPlayingFilms() {
  getNowPlayingFilms(
    cinemaType.MOVIE,
    ( data ) => {
      playingNow.value = data.results.map( el => new Film( el ) ).slice( 0, 6 )
    },
    () => {

    }
  )
  return { playingNow }
}

export function useLoadTopFilms() {
  getTopFilms(
    cinemaType.MOVIE,
    ( data ) => {
      topRatingFilmList.value = data.results
    },
    () => {

    }
  )
  return { topRatingFilmList }
}

export function useLoadPopularSeries() {
  getPopularFilms(
    cinemaType.TV,
    ( data ) => {
      popularSeriesList.value = data.results
    },
    () => {

    }
  )
  return { popularSeriesList }
}

export function useLoadPopularFilms() {
  getPopularFilms(
    cinemaType.MOVIE,
    ( data ) => {
      popularFilmList.value = data.results
    },
    () => {

    }
  )
  return { popularFilmList }
}

export function useLoadUpcomingFilms() {
  getUpcomingFilms(
    cinemaType.MOVIE,
    ( data ) => {
      upcomingFilmList.value = data.results
    },
    () => {

    }
  )
  return { upcomingFilmList }
}