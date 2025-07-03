import { ref as storageRef, listAll, getDownloadURL, getMetadata } from 'firebase/storage'

import { storage } from '@/firebase'
import { useFilesStore } from '@/stores/files'

// Получает список всех файлов из Firebase Storage и сохраняет их в Pinia
async function useFirebaseFilesFetch() {
  const filesStore = useFilesStore()
  filesStore.loading = true
  try {
    const folderRef = storageRef(storage, 'upload-files')
    const res = await listAll(folderRef)
    const fetched = await Promise.all(
      res.items.map(async (item) => {
        const url = await getDownloadURL(item)
        const meta = await getMetadata(item)
        return {
          id: meta.fullPath,
          name: meta.name,
          size: meta.size,
          url,
          date: meta.timeCreated,
          type: meta.contentType || '',
        }
      }),
    )

    filesStore.setUploadedFiles(fetched)
    return fetched
  } catch (error) {
    alert('Error getting file list')
    console.error(error)
  } finally {
    filesStore.loading = false
  }
}

export { useFirebaseFilesFetch }
