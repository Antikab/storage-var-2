<script setup>
import iconUpload from '@/assets/icons/icon-upload.svg'
</script>

<template>
  <button
    class="flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-color hover:bg-primary-color-hover text-neutral-100 hover:text-white cursor-pointer transition-colors duration-250 select-none"
  >
    <inline-svg class="size-[20px]" :src="iconUpload" aria-label="icon btn upload" />
    <span class="text-sm font-medium">Upload</span>
  </button>
</template>
