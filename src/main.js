import './assets/main.css'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/favorites',
        component: Favorites
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const app = createApp(App)



const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }

})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
