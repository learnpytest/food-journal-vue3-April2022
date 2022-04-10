import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "./plugins/fontawsome"

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')