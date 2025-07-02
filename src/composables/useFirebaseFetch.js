import { useFilesStore } from '@/stores/files'
import { ref as storageRef, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
import { storage } from '@/firebase'

async function useFirebaseFetch() {
  const filesStore = useFilesStore()
  if (filesStore.loaded) return filesStore.uploadedFiles
  console.log('already loaded:', filesStore.uploadedFiles)
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
    console.log('Fetched from firebase:', fetched)
    return fetched
  } catch (e) {
    alert('Error getting file list')
    console.log(e)
  } finally {
    filesStore.loading = false
  }
}

export { useFirebaseFetch }
