import { useNotification } from "@kyvg/vue3-notification"
import i18n from "@/i18n"


const { notify } = useNotification()

export const $notify = ( title, text, type ) => {
  notify( {
    title: i18n.global.t( title ),
    text: i18n.global.t( text ),
    type
  } )
}