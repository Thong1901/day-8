<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: '30px' // kích thước mặc định
  },
  to: {
    type: String,
    default: '' // nếu có thì render <a>
  },
  external: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <component
  :is="to ? 'a' : 'button'"
  class="inline-flex items-center justify-center rounded-full border border-solid border-gray-300 text-slate-400 hover:bg-gray-100 text-3" 
  :style="{ width: size, height: size }"
  :href="to || undefined"
  :target="to && external ? '_blank' : undefined"
  @click="!to && emit('click')"
>
  <slot />
</component>

</template>
