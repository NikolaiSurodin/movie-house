import Episode from './Episode'

class Season {
  air_date
  episode_count
  id
  name
  overview
  poster_path
  season_number
  vote_average
  episode_number
  episode_type
  production_code
  runtime
  show_id
  still_path
  vote_count
  last_episode_to_air
  episodes

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.poster_path = this.poster_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.poster_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
    this.still_path = this.still_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.still_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href

    if( this.episodes !== null ) {
      this.episodes = this.episodes.map( el => new Episode( el ) )
    }
  }
}

export default Season