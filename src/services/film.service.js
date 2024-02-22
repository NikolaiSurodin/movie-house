import { instance } from './http.service'
import { endpoints } from '../endpoints'


export const getFilmList = ( key, params, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.list.replace( '{:key}', key ), { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getFilmItem = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.item.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getRecommendations = ( params, id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.recommendations.replace( '{:id}', id ).replace( '{:key}', key ), { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getSimilarFilmList = ( params, id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.similarFilmList.replace( '{:id}', id ).replace( '{:key}', key ), { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data, data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getCredits = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.credits.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getGenres = ( key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.genres.replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getKeyWords = ( params, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.keyWords, { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getFilmsByName = ( params, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.searchFilms.replace( '{:key}', key ), { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getTrailers = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.trailers.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getNowPlayingFilms = ( key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.nowPlaying.replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getPopularFilms = ( key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.popular.replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getTopFilms = ( key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.top.replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getUpcomingFilms = ( key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.upcoming.replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getMyFavoriteFilmList = ( id, key, params, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.favoriteList.replace( '{:id}', id ).replace( '{:key}', key ), { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const addToFavorite = ( payload, accountId, sessionId, successCallback, errorCallback ) => {
  instance.post( endpoints.cinema.addToFavorite
      .replace( '{:account_id}', accountId )
      .replace( '{:session_id}', sessionId ),
    payload )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getReviews = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.reviews.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getImages = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.cinema.images.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const getSeasonItem = ( series_id, season_number, successCallback, errorCallback ) => {
  instance.get( endpoints.tv.season.replace( '{:series_id}', series_id ).replace( '{:season_number}', season_number ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}