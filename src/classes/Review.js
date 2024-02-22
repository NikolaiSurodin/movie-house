class Review {
  author
  author_details
  content
  created_at
  id
  updated_at
  url

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.author_details.avatar_path = this.author_details.avatar_path !== null ? `${ import.meta.env.VITE_IMAGE_URL_SMALL }${ this.author_details.avatar_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
  }
}

export default Review