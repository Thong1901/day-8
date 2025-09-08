<template>
  <button
    class="transition duration-200 inline-flex items-center justify-center rounded-md font-semibold cursor-pointer focus:ring-4 focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed"
    :class="[variantClass, circleClass]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) =>
      ['primary', 'secondary', 'danger', 'outline'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md', // sm | md | lg
    validator: (v: string) => ['sm', 'md', 'lg'].includes(v),
  },
});

defineEmits(['click']);

const variantClass = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'bg-white border border-gray-100 text-slate-500 hover:bg-gray-100 ';
    default: // primary
      return 'bg-blue-900 text-white border-0 font-medium ';
  }
});

const circleClass = computed(() => {
  if (!props.circle) {
    // normal rectangular button
    return 'py-2 px-3';
  }
  // circle button (width = height, full rounded)
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8 rounded-full';
    case 'lg':
      return 'w-12 h-12 rounded-full';
    default: // md
      return 'w-10 h-10 rounded-full';
  }
});
</script>

