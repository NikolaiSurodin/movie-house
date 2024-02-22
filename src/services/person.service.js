import { instance } from './http.service'
import { endpoints } from '../endpoints'

export const getPopularPeople = ( params, successCallback, errorCallback ) => {
  instance.get( endpoints.person.list, { params: { ...params } } )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err )
    } )
}
export const getPerson = ( id, successCallback, errorCallback ) => {
  instance.get( endpoints.person.item.replace( '{:id}', id ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err )
    } )
}

export const getImagesByPerson = ( id, successCallback, errorCallback ) => {
  instance.get( endpoints.person.images.replace( '{:id}', id ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err )
    } )
}

export const getCreditsByPerson = ( id, key, successCallback, errorCallback ) => {
  instance.get( endpoints.person.credits.replace( '{:id}', id ).replace( '{:key}', key ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err )
    } )
}

export const getSocialMediaByPerson = ( id, successCallback, errorCallback ) => {
  instance.get( endpoints.person.social.replace( '{:id}', id ) )
    .then( ( data ) => {
      successCallback( data.data )
    } )
    .catch( ( err ) => {
      errorCallback( err )
    } )
}