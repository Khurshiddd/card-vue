import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Validate from 'validate';

const app = createApp(App)
// app.use(Validate)
app.use(router)

app.mount('#app')
