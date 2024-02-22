class Me {
   
avatar
id
include_adult
iso_639_1
iso_3166_1
name
username
  
    constructor( data = {} ) {
      for ( let key of Object.keys( this ) ) {
        this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
      }
      if( this.avatar !== null ) {
        this.avatar.tmdb = this.avatar.tmdb !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.avatar.tmdb.avatar_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
      }
    }
  }
  
  export default Me