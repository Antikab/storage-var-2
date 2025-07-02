// useFileDelete - реализует удаление файла из Firebase Storage с обновлением состояния в Pinia и перенаправлением на главную, если файлов больше нет.
import { ref as vueRef } from 'vue'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFilesStore } from '@/stores/files'
import { useRouter } from 'vue-router'
import { storage } from '@/firebase'

function useFileDelete() {
  const deletingId = vueRef(null)
  const filesStore = useFilesStore()
  const router = useRouter()

  async function deleteFile(id) {
    deletingId.value = id
    try {
      const fileRef = storageRef(storage, id)
      await deleteObject(fileRef)
      filesStore.removeUploadedFile(id)
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
