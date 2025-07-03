import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ref as storageRef, uploadBytes } from 'firebase/storage'

import { generateFileId } from '@/utils/utils'
import { useFirebaseFilesFetch } from '@/composables/useFirebaseFilesFetch'
import { storage } from '@/firebase'
import { useFilesStore } from '@/stores/files'

function useFileUpload() {
  const filesStore = useFilesStore()
  const fileInput = ref(null)
  const dragZone = ref(false)
  const router = useRouter()

  // Открыть диалоговое окно выбора файлов
  function openFileDialog() {
    if (fileInput.value) fileInput.value.value = ''
    fileInput.value?.click()
  }

  // Добавить файлы в хранилище для временного списка
  function addAdvanceFileList(files) {
    if (!files) return
    for (const file of files) {
      const id = generateFileId(file)
      filesStore.addLocalFile({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      })
    }
    if (fileInput.value) fileInput.value.value = ''
  }

  // Загрузка файлов в хранилище FB
  async function uploadAllFiles() {
    filesStore.loading = true
    try {
      await Promise.all(
        filesStore.localFiles.map(async (localFile) => {
          const fileRef = storageRef(storage, `upload-files/${localFile.name}`)
          await uploadBytes(fileRef, localFile.file)
        }),
      )
      await useFirebaseFilesFetch()
      filesStore.clearLocalFiles()
      router.replace({ name: 'files' })
    } catch (error) {
      alert('Ошибка при загрузке файлов')
      console.error(error)
    } finally {
      filesStore.loading = false
    }
  }

  // Drag&Drop обработчики (если надо)
  function onDragOver() {
    dragZone.value = true
  }
  function onDragLeave() {
    dragZone.value = false
  }
  function onDrop(event) {
    const files = event.dataTransfer.files
    dragZone.value = false
    addAdvanceFileList(files)
  }

  return {
    fileInput,
    dragZone,
    openFileDialog,
    addAdvanceFileList,
    uploadAllFiles,
    onDragOver,
    onDragLeave,
    onDrop,
  }
}

export { useFileUpload }
