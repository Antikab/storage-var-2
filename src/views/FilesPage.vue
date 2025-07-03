<script setup>
import AdvanceFileList from '@/components/AdvanceFileList.vue'
import BtnUpload from '@/components/BtnUpload.vue'
import FileRow from '@/components/FileRow.vue'
import { useFileUpload } from '@/composables/useFileUpload'
import { useFilesStore } from '@/stores/files'

const { fileInput, openFileDialog, addAdvanceFileList, uploadAllFiles } = useFileUpload()
const filesStore = useFilesStore()
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full flex justify-between items-center px-6 py-5">
      <div class="text-lg font-medium text-black-color">Files uploaded</div>
      <BtnUpload @click="filesStore.localFiles.length ? uploadAllFiles() : openFileDialog()" />
      <input
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="(event) => addAdvanceFileList(event.target.files)"
      />
    </div>

    <div class="w-full md:w-1/2 pb-4 mb-10 shadow-lg" v-if="filesStore.localFiles.length">
      <div class="flex flex-nowrap justify-center items-center gap-2 mt-3 mb-2">
        <button
          class="flex flex-none justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="openFileDialog"
        >
          <div class="text-sm">Add files</div>
        </button>
        <button
          class="flex flex-none justify-center items-center gap-2 px-4 py-2 bg-primary-color hover:bg-primary-color-hover text-white rounded-sm cursor-pointer"
          @click="filesStore.clearLocalFiles"
        >
          <div class="text-sm">Clear list</div>
        </button>
      </div>
      <AdvanceFileList />
    </div>

    <div v-if="filesStore.loading" class="text-gray-400 text-center py-8">
      Loading files, please wait...
    </div>

    <FileRow v-else />
  </div>
</template>
