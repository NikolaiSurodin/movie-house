import Person from './Person'
import { cinemaType } from '../const/cinemaType'

class Film {
  backdrop_path
  overview
  title
  adult
  genre_ids
  id
  original_language
  original_title
  popularity
  poster_path
  release_date
  video
  vote_average
  vote_count
  genres
  media_type
  credits


  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.backdrop_path = `${ import.meta.env.VITE_IMAGE_URL }${ this.backdrop_path }`
    this.poster_path = this.poster_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.poster_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
    this.media_type = cinemaType.MOVIE
    if( this.credits !== null ) {
      this.credits.cast = this.credits.cast.map( el => new Person( el ) )
      this.credits.crew = this.credits.crew.map( el => new Person( el ) )
    }
  }
}

export default Film