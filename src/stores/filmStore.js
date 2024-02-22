import { defineStore } from 'pinia'
import { getMyFavoriteFilmList, addToFavorite } from '../services/film.service'
import Film from '../classes/Film'

import { useMeStore } from './meStore'

export const useFilmStore = defineStore( 'film', {
  state: () => ( {
    myFavoriteFilmList: [],
    seasonList: []
  } ),
  getters: {
    getMyFavoriteFilmList: ( state ) => state.myFavoriteFilmList,
    getMyFavoriteFilmIdList: ( state ) => state.myFavoriteFilmList.map( el => el.id )
  },
  actions: {
    async loadFavoriteFilmList( key ) {
      if( !useMeStore().getIsLoggedIn ) {
        return
      }
      const id = useMeStore().me.id
      const session_id = useMeStore().$state.session
      await getMyFavoriteFilmList(
        id,
        key,
        { session_id: session_id },
        ( data ) => {
          this.myFavoriteFilmList = data.results.map( el => new Film( el ) )
        },
        ( err ) => {
          console.log( err )
        }
      )
    },
    addFilmToFavoriteList( id, favorite, mediaType ) {
      return new Promise( ( resolve, reject ) => {
        addToFavorite(
          {
            'media_type': mediaType,
            'media_id': id,
            'favorite': favorite
          },
          useMeStore().me.id,
          useMeStore().session,
          () => {
            resolve()
          },
          () => {
            reject()
          }
        )
      } )
    },
    filterMyFavoriteFilmList( id ) {
      this.myFavoriteFilmList = this.myFavoriteFilmList.filter( el => el.id !== id )
    },
    setSeasonList( data ) {
      console.log(data)
      this.seasonList = data
    },
    clearSeasonList() {
      this.seasonList = []
    }
  }
} )