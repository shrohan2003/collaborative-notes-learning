// Vue app তৈরি করার function
import { createApp } from 'vue'

// Vuetify-এর ready-made design system
import 'vuetify/styles'

// Vuetify চালু করার function
import { createVuetify } from 'vuetify'

// Vuetify-এর সব UI components ও directives
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// আমাদের প্রধান Vue component
import App from './App.vue'

// আগের global CSS file
import './style.css'

// Vuetify plugin তৈরি করা
const vuetify = createVuetify({
  components,
  directives,
})

// Vue app-এ Vuetify যোগ করে browser-এ দেখানো
createApp(App).use(vuetify).mount('#app')