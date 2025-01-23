import { createRouter, createWebHistory } from 'vue-router'
import AddTask from '../views/AddTask.vue'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Add task',
            component: AddTask
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        }

    ]
})


export default router