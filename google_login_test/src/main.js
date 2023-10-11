import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '776740360435-3ro03vug02rv3gp61o1td2g1h5jvdcfk.apps.googleusercontent.com'
})

app.mount('#app')