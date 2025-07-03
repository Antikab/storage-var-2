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
      <BtnUpload v-if="!filesStore.localFiles.length" @click="openFileDialog" />
      <input
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="(event) => addAdvanceFileList(event.target.files)"
      />
    </div>

    <div class="w-full md:w-1/2 pb-4 mb-10 shadow-lg" v-if="filesStore.localFiles.length">
      <div class="flex flex-nowrap justify-between items-center gap-2 mt-2 mb-4 mx-2">
        <div class="flex flex-nowrap gap-2">
          <button
            class="flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-color hover:bg-primary-color-hover text-neutral-100 hover:text-white cursor-pointer transition-colors duration-250 select-none"
            @click="openFileDialog"
          >
            <div class="text-sm">Add files</div>
          </button>
          <button
            class="flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-color hover:bg-primary-color-hover text-neutral-100 hover:text-white cursor-pointer transition-colors duration-250 select-none"
            @click="filesStore.clearLocalFiles"
          >
            <div class="text-sm">Clear list</div>
          </button>
        </div>
        <BtnUpload v-if="filesStore.localFiles.length" @click="uploadAllFiles" />
      </div>
      <AdvanceFileList />
    </div>

    <div v-if="filesStore.loading" class="text-gray-400 text-center py-8">
      Loading files, please wait...
    </div>

    <FileRow v-else />
  </div>
</template>
