import { defineStore } from 'pinia'
import { ref } from 'vue'

const useFilesStore = defineStore('files', () => {
  const loading = ref(false)
  const loaded = ref(false)
  const localFiles = ref([])
  const uploadedFiles = ref([])

  function addLocalFile(file) {
    if (!localFiles.value.some((f) => f.id === file.id)) {
      localFiles.value.push(file)
    }
  }

  function removeLocalFile(id) {
    localFiles.value = localFiles.value.filter((f) => f.id !== id)
  }
  function removeUploadedFile(id) {
    uploadedFiles.value = uploadedFiles.value.filter((f) => f.id !== id)
  }

  function clearLocalFiles() {
    localFiles.value = []
  }

  function setUploadedFiles(files) {
    uploadedFiles.value = files
    loaded.value = true
  }

  return {
    loading,
    loaded,
    localFiles,
    uploadedFiles,
    addLocalFile,
    removeLocalFile,
    removeUploadedFile,
    clearLocalFiles,
    setUploadedFiles,
  }
})

export { useFilesStore }
