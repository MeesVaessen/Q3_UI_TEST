import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '413309332388-asggfrgcbh5r1vul4eqv0l3t4o0dsq5h.apps.googleusercontent.com',
})

app.mount('#app')