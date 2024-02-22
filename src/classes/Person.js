class Person {
  adult
  cast_id
  character
  credit_id
  gender
  id
  known_for_department
  name
  order
  original_name
  popularity
  profile_path
  biography
  birthday
  place_of_birth
  department
  job

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.profile_path = this.profile_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.profile_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
  }
}

export default Person