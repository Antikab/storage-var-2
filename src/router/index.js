import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/UploadPage.vue'),
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('@/views/FilesPage.vue'),
    }
  ],
})

export default router
