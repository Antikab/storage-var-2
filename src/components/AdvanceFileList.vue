<script setup>
import FileIcon from '@/components/FileIcon.vue'
import { formatSize, getFileIcon } from '@/utils/utils'
import { useFilesStore } from '@/stores/files'

const filesStore = useFilesStore()
</script>

<template>
  <div class="max-h-[175px] flex flex-col gap-2.5 overflow-y-auto">
    <TransitionGroup name="list">
      <div
        v-for="file in filesStore.localFiles"
        :key="file.id"
        class="flex flex-col gap-1 px-4 py-2 mx-4 bg-light-gray-color-2 active:bg-primary-light-color hover:bg-primary-light-color text-xs break-all rounded-md transition-colors duration-300"
      >
        <button
          class="ml-auto text-primary-color-hover active:text-red-600 hover:text-red-600 select-none"
          @click="filesStore.removeLocalFile(file.id)"
        >
          <span class="px-1 py-2"> Delete </span>
        </button>
        <div class="flex items-center gap-3">
          <FileIcon bg="bg-gray-color-2" bgSvg="text-light-gray-color-2" :src="getFileIcon(file)" />
          <div>{{ file.name }}</div>
        </div>
        <div>Size: {{ formatSize(file.size) }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.list-leave-active {
  position: relative;
  z-index: 1;
}
</style>
