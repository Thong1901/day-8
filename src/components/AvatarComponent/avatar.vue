<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Avatar'
  },
  size: {
    type: String,
    default: '35px' // default size
  },
  rounded: {
    type: String,
    default: 'full' // 'full', 'lg', 'md' ...
  }
})
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    class="object-cover"
    :class="[`rounded-${props.rounded}`]"
    :style="{ width: props.size, height: props.size }"
  />
</template>
