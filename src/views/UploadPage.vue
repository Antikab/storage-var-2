<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

import IconUploadDndActive from '@/assets/icons/icon-upload-dnd-active.svg'
import IconUploadDnd from '@/assets/icons/icon-upload-dnd.svg'
import AdvanceFileList from '@/components/AdvanceFileList.vue'
import BtnUpload from '@/components/BtnUpload.vue'
import { useFileUpload } from '@/composables/useFileUpload'
import { useFilesStore } from '@/stores/files'

const filesStore = useFilesStore()
const {
  fileInput,
  dragZone,
  openFileDialog,
  addAdvanceFileList,
  uploadAllFiles,
  onDragOver,
  onDragLeave,
  onDrop,
} = useFileUpload()

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const preventDefaults = (event) => event.preventDefault()

onMounted(() => {
  events.forEach((eventName) => {
    window.addEventListener(eventName, preventDefaults)
  })
})
onBeforeUnmount(() => {
  events.forEach((eventName) => {
    window.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<template>
  <div class="w-full flex flex-col items-center h-screen">
    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="(event) => addAdvanceFileList(event.target.files)"
    />
    <div class="w-full text-lg font-medium text-black-color px-6 py-5">My projects</div>

    <div class="w-full border-b border-b-light-gray-color"></div>

    <div class="w-[352px] flex flex-col justify-center grow lg:mb-10">
      <div
        v-if="!filesStore.localFiles.length"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        class="flex flex-col justify-center items-center pb-6 transition-colors duration-500"
      >
        <div class="relative h-[120px] w-[152px] m-auto">
          <inline-svg
            :src="IconUploadDnd"
            class="absolute inset-0 transition-opacity duration-400"
            :class="dragZone ? 'opacity-0' : 'opacity-100'"
            aria-label="icon upload dnd"
            role="img"
          />
          <inline-svg
            :src="IconUploadDndActive"
            class="absolute inset-0 transition-opacity duration-400"
            :class="dragZone ? 'opacity-100' : 'opacity-0'"
            aria-label="icon upload dnd"
            role="img"
          />
        </div>
        <p
          :class="{ 'text-primary-color-hover': dragZone }"
          class="text-black-color pb-1 transition-colors duration-500"
        >
          Start by uploading a file
        </p>
        <p
          :class="{ 'text-primary-color-hover': dragZone }"
          class="text-center text-sm font-light transition-colors duration-500"
        >
          Any assets used in projects will live here. <br />
          Start creating by uploading your files.
        </p>
      </div>

      <AdvanceFileList v-else />

      <div v-if="filesStore.localFiles.length" class="flex flex-nowrap gap-2 mt-3 mb-2">
        <button
          class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="openFileDialog"
        >
          <div class="text-sm">Add files</div>
        </button>
        <button
          class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="filesStore.clearLocalFiles"
        >
          <div class="text-sm">Clear list</div>
        </button>
      </div>
      <BtnUpload @click="filesStore.localFiles.length ? uploadAllFiles() : openFileDialog()" />
    </div>
  </div>
</template>
