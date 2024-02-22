class Episode {
  air_date
  crew
  episode_number
  episode_type
  guest_stars
  id
  name
  overview
  production_code
  runtime
  season_number
  show_id
  still_path
  vote_average
  vote_count

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.still_path = this.still_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.still_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
  }
}

export default Episode