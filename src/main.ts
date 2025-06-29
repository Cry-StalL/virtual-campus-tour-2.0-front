import { createApp } from 'vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router/index.ts'

import '@/assets/css/global.css'

const app = createApp(App)

app.use(router)
app.use(ElementUI)
app.mount('#app')