// useFileDelete - реализует удаление файла из Firebase Storage с обновлением состояния в Pinia и перенаправлением на главную, если файлов больше нет.
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFilesStore } from '@/stores/files'
import { storage } from '@/firebase'

function useFileDelete() {
  const deletingId = ref(null)
  const filesStore = useFilesStore()
  const router = useRouter()

  async function deleteFile(fullPath) {
    deletingId.value = fullPath
    try {
      const fileRef = storageRef(storage, fullPath)
      await deleteObject(fileRef)
      filesStore.removeUploadedFile(fullPath)
      if (filesStore.uploadedFiles.length === 0) {
        router.replace({ name: 'home' })
      }
    } catch (e) {
      alert('Error deleting file')
      console.log(e)
    } finally {
      deletingId.value = null
    }
  }

  return { deletingId, deleteFile }
}

export { useFileDelete }
