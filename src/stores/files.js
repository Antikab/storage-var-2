import { defineStore } from 'pinia'
import { ref } from 'vue'

const useFilesStore = defineStore('files', () => {
  const loading = ref(false)
  const loaded = ref(false)
  const localFiles = ref([])
  const uploadedFiles = ref([])

  const addLocalFile = (file) => {
    if (!localFiles.value.some((f) => f.id === file.id)) {
      localFiles.value.push(file)
    }
  }
  const setUploadedFiles = (files) => {
    uploadedFiles.value = files
    loaded.value = true
  }
  const removeUploadedFile = (id) =>
    (uploadedFiles.value = uploadedFiles.value.filter((f) => f.id !== id))
  const removeLocalFile = (id) => (localFiles.value = localFiles.value.filter((f) => f.id !== id))
  const clearLocalFiles = () => (localFiles.value = [])

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
