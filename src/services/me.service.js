import { instance } from './http.service'
import { endpoints } from '../endpoints'

export const sendLogin = ( payload, successCallback, errorCallback ) => {
  instance.post( endpoints.me.login, payload )
    .then( ( data ) => {
      successCallback( data )
    } )
    .catch( ( err ) => {
      errorCallback( err.response )
    } )
}

export const createToken = ( successCallback, errorCallback ) => {
  instance.get( endpoints.me.token )
    .then( ( data ) => {
      successCallback( data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}
export const openSession = ( payload, successCallback, errorCallback ) => {
  instance.post( endpoints.me.session, payload )
    .then( ( data ) => {
      successCallback( data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}

export const loadMyAccount = ( id, successCallback, errorCallback ) => {
  instance.get( endpoints.me.account.replace( '{:session_id}', id ) )
    .then( ( data ) => {
      successCallback( data )
    } )
    .catch( ( err ) => {
      errorCallback( err.code )
    } )
}
