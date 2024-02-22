import { defineStore } from 'pinia'
import { sendLogin, createToken, openSession, loadMyAccount } from '../services/me.service'
import Me from '../classes/Me'

export const useMeStore = defineStore( 'me', {
  state: () => (
    {
      me: {},
      token: localStorage.getItem( 'token' ) || '',
      session: localStorage.getItem( 'session' ) || ''
    }
  ),
  getters: {
    getAvatar: ( state ) => state.me?.avatar?.tmdb,
    getIsLoggedIn: ( state ) => !!state.session
  },
  actions: {
    login( payload ) {
      return new Promise( ( resolve, reject ) => {
        createToken(
          ( data ) => {
            this.token = data.data.request_token
            localStorage.setItem( 'token', this.token )
            this.sendLoginWithData(
              {
                ...payload,
                request_token: this.token
              }
            )
              .then( () => {
                this.openNewSession()
                resolve()
              } )
              .catch( ( err ) => {
                reject( err.data.status_message )
              } )
          },
          ( err ) => {
            console.log( err )
          },
        )
      } )
    },
    sendLoginWithData( payload ) {
      return new Promise( ( resolve, reject ) => {
        sendLogin(
          { ...payload },
          () => {
            resolve()
          },
          ( err ) => {
            reject( err )
          }
        )
      } )
    },
    openNewSession() {
      openSession(
        { request_token: this.token },
        ( data ) => {
          this.session = data.data.session_id
          localStorage.setItem( 'session', this.session )
          this.loadMe()
        },
        () => {
        }
      )
    },
    loadMe() {
      return new Promise( resolve => {
        const session = localStorage.getItem( 'session' )
        if( session ) {
          loadMyAccount(
            session,
            ( data ) => {
              this.me = new Me( data.data )
              resolve( this.me )
            },
            () => {
              this.logout()
            }
          )
        }
      } )
    },
    logout() {
      localStorage.removeItem( 'session' )
      localStorage.removeItem( 'token' )
      this.me = {}
      this.token = ''
      this.session = ''
    }
  }
} )