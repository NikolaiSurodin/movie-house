import Person from './Person'
import Season from './Season'
import { cinemaType } from '../const/cinemaType'

class TvShow {
  backdrop_path
  first_air_date
  genre_ids
  genres
  id
  name
  origin_country
  original_language
  original_name
  overview
  popularity
  poster_path
  vote_average
  vote_count
  media_type
  credits
  last_episode_to_air
  seasons
  status
  homepage

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.backdrop_path = `${ import.meta.env.VITE_IMAGE_URL }${ this.backdrop_path }`
    this.poster_path = this.poster_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.poster_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
    this.media_type = cinemaType.TV
    if( this.credits !== null ) {
      this.credits.cast = this.credits.cast.map( el => new Person( el ) )
      this.credits.crew = this.credits.crew.map( el => new Person( el ) )
    }
    if( this.last_episode_to_air !== null ) {
      this.last_episode_to_air = new Season( this.last_episode_to_air )
    }
    if( this.seasons !== null ) {
      this.seasons = this.seasons.map( el => new Season( el ) )
    }
  }
}

export default TvShow