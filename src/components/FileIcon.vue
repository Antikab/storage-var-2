<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 40,
  },
  bg: {
    type: String,
    default: 'bg-primary-light-color',
  },
  bgSvg: {
    type: String,
    default: 'text-primary-color',
  },
  src: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    :class="[
      'flex flex-none items-center justify-center rounded-full pointer-events-none',
      props.bg,
      props.bgSvg,
    ]"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
    }"
  >
    <inline-svg :src="props.src" class="w-5 h-5" aria-label="file-icon" />
  </div>
</template>
