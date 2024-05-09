
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from './router'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VXETable)

app.mount('#app')
