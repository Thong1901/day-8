
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'uno.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css';
import { createPinia } from 'pinia'


import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// Thêm vào library
library.add(faFacebookF, faTwitter, faLinkedin, faMagnifyingGlass)
const app = createApp(App)
const pinia = createPinia()
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(VueTippy, {
    directive: 'tippy',
    component: 'Tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
        placement: 'top',
        animation: 'scale',
        arrow: true,
        theme: 'light-border',
    },
});

app.use(pinia)
app.use(router)
app.mount('#app')
