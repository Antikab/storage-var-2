<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { bytesToSize } from '@/utils/utils'
import IconUpload from '@/assets/icons/icon-upload.svg'
import IconUploadDndActive from '@/assets/icons/icon-upload-dnd-active.svg'
import IconUploadDnd from '@/assets/icons/icon-upload-dnd.svg'

const fileInput = ref(null)
const filesList = ref([])
const dragZone = ref(false)

function onClick() {
  fileInput.value?.click()
}

function onClearAll() {
  filesList.value = []
}

function onDragOver() {
  dragZone.value = true
}

function onDragLeave() {
  dragZone.value = false
}

function onDrop(event) {
  dragZone.value = false

  const currentFiles = event.dataTransfer.files
  for (const file of currentFiles) {
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
    }
    filesList.value.push(fileData)
    console.log(filesList.value)
  }
}

function uploadFiles() {
  const currentFiles = fileInput.value.files
  for (const file of currentFiles) {
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
    }
    filesList.value.push(fileData)
    console.log(filesList.value)
  }
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

function preventDefaults(event) {
  event.preventDefault()
}

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
    <div class="w-full text-lg font-medium text-black-color px-6 py-5">My projects</div>

    <div class="w-full border-b border-b-light-gray-color"></div>

    <div class="w-[352px] flex flex-col justify-center grow lg:mb-10">
      <div
        v-if="!filesList.length"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        :class="{ 'bg-amber-300': dragZone }"
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
      <div v-else class="max-h-[175px] h-fit flex flex-col gap-2.5 overflow-y-auto">
        <div
          v-for="file in filesList"
          :key="file.name + file.size"
          class="flex flex-col gap-1 odd:bg-light-gray-color even:bg-light-gray-color-2 px-4 py-2 mx-4 text-xs break-all rounded-md"
        >
          <div>{{ file.name }}</div>
          <div>Size: {{ bytesToSize(file.size) }}</div>
        </div>
      </div>
      <div class="flex flex-nowrap gap-2 mt-3 mb-2">
        <button
          v-if="filesList.length"
          class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="onClick"
        >
          <div class="text-sm">Add files</div>
        </button>
        <button
          v-if="filesList.length"
          class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="onClearAll"
        >
          <div class="text-sm">Clear list</div>
        </button>
      </div>
      <button
        class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
        @click="onClick"
      >
        <inline-svg class="size-5" :src="IconUpload" aria-label="Upload btn"></inline-svg>
        <span class="text-sm"> Upload </span>
      </button>
      <input
        id="file_uploads"
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="uploadFiles"
      />
    </div>
  </div>
</template>
