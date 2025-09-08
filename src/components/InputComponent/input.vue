<template>
  <div class="w-full">
    <input 
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 box-border"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'Enter text'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// khai báo modelValue (Vue 3.3+)
const model = defineModel({ type: String, default: '' })
</script>
