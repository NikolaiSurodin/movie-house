class Image {
  aspect_ratio
  file_path
  height
  iso_639_1
  vote_average
  vote_count
  width

  constructor( data = {} ) {
    for ( let key of Object.keys( this ) ) {
      this[ key ] = data.hasOwnProperty( key ) ? data[ key ] : null
    }
    this.file_path = this.file_path !== null ? `${ import.meta.env.VITE_IMAGE_URL }${ this.file_path }` : new URL( '/src/assets/images/cat-preloader.png', import.meta.url ).href
  }
}

export default Image