import { AnFilledHome, BxCameraMovie, FaPhotoFilm, BsPersonHearts } from "@kalimahapps/vue-icons"
import i18n from "@/i18n"

export const nav = [
  {
    name: 'nav.home',
    path: '/',
    icon: AnFilledHome
  },
  {
    name: 'nav.films',
    path: '/films',
    icon: BxCameraMovie
  },
  {
    name: 'nav.shows',
    path: '/tv-shows',
    icon: FaPhotoFilm
  },
  {
    name: 'nav.people',
    path: '/people',
    icon: BsPersonHearts
  },
]

export const options = [
  {
    label: i18n.global.t( 'nav.collection' ),
    key: "collection",
  },
  {
    label: i18n.global.t( 'nav.logout' ),
    key: "logout",
  }
]