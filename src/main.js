// import './assets/main.css'
import './assets/common.css'

import { createApp } from 'vue'
import { Quasar, Loading } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
import store from './vuex/store';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App)

app.use(Quasar, {
    plugins: {Loading},
    config: {Loading},
})
app.use(store);
app.use(router)
app.use(VueDOMPurifyHTML);

app.mount('#app')
