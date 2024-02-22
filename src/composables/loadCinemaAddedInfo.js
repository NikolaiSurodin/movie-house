import { ref } from 'vue'
import { getImages } from '../services/film.service'
import Image from '../classes/Image'

const imageList = ref( [] )

export function loadImages( id, key ) {
  getImages(
    id,
    key,
    ( data ) => {
      imageList.value = [ ...data.backdrops ].map( el => new Image( el ) )
    },
    () => {
    }
  )
  return { imageList }
}