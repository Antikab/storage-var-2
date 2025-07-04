// useFileDelete - реализует удаление файла из Firebase Storage с обновлением состояния в Pinia и перенаправлением на главную, если файлов больше нет.
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ref as storageRef, deleteObject } from 'firebase/storage'

import { storage } from '@/firebase'
import { useFilesStore } from '@/stores/files'

const useFileDelete = () => {
  const deletingId = ref(null)
  const filesStore = useFilesStore()
  const router = useRouter()

  const deleteFile = async (fullPath) => {
    deletingId.value = fullPath
    try {
      const fileRef = storageRef(storage, fullPath)
      await deleteObject(fileRef)
      filesStore.removeUploadedFile(fullPath)
      if (filesStore.uploadedFiles.length === 0) {
        router.replace({ name: 'home' })
      }
    } catch (error) {
      alert('Error deleting file')
      console.error(error)
    } finally {
      deletingId.value = null
    }
  }

  return { deletingId, deleteFile }
}

export { useFileDelete }
