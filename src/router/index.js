import { createRouter, createWebHistory } from 'vue-router'
import { useFirebaseFetch } from '@/composables/useFirebaseFetch'
import { useFilesStore } from '@/stores/files'

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
    },
  ],
})

router.beforeEach(async (to) => {
  const filesStore = useFilesStore()

  if (!filesStore.loaded && (to.name === 'home' || to.name === 'files')) {
    await useFirebaseFetch()
  }

  if (to.name === 'home' && filesStore.uploadedFiles.length) {
    return { name: 'files' }
  }

  if (to.name === 'files' && !filesStore.uploadedFiles.length) {
    return { name: 'home' }
  }
})

export default router
