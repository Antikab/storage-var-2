<script setup>
import { ref } from 'vue'
import IconUpload from '@/assets/icons/icon-upload.svg'
import IconUploadDnd from '@/assets/icons/icon-upload-dnd.svg'

const fileInput = ref(null)
const onClick = () => fileInput.value.click()
</script>

<template>
  <div class="w-full flex flex-col items-center h-screen">
    <div class="w-full text-lg font-medium text-black-color px-6 py-5">My projects</div>

    <div class="w-full border-b border-b-light-gray-color"></div>

    <div class="w-[352px] flex flex-col justify-center gap-6 lg:mb-10 grow">
      <div class="flex flex-col justify-center items-center">
        <inline-svg
          class="w-[152px] h-[118px] mb-4"
          :src="IconUploadDnd"
          aria-label="Upload dnd"
        ></inline-svg>
        <p class="text-black-color mb-1">Start by uploading a file</p>
        <p class="text-center text-sm font-light">
          Any assets used in projects will live here. <br />
          Start creating by uploading your files.
        </p>
      </div>
      <button
        class="flex flex-nowrap w-full justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
        @click="onClick"
      >
        <inline-svg class="size-5" :src="IconUpload" aria-label="Upload btn"></inline-svg>
        <span class="text-sm"> Upload </span>
      </button>
      <input id="file_uploads" ref="fileInput" type="file" multiple class="hidden" />
    </div>
  </div>
</template>
