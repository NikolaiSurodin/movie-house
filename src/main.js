import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/store'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia()
const app = createApp( App )
app.use( pinia )
const store = useStore().initialize()
app.use( i18n )
app.use( router )
app.use( Notifications )
app.mount( '#app' )

