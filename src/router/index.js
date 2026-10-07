import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/App.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Browse from '../views/Browse.vue'
import EventList from '../views/EventList.vue'
import EventDetail from '../views/EventDetail.vue'
import Category from '../views/Category.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'about', name: 'about', component: About },
        { path: 'contact', name: 'contact', component: Contact },
        {
          path: 'browse',
          component: Browse,
          children: [
            { path: '', redirect: '/browse/events' },
            { path: 'events', name: 'events', component: EventList },
            { path: 'events/:id', name: 'event-detail', component: EventDetail },
            { path: 'category', name: 'category', component: Category },
          ],
        },
      ],
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
      ],
    },
  ],
})

export default router
