<template>
  <div
    v-if="visible"
    :class="[
      'p-4 mb-4 rounded-lg text-sm',
      type === 'success' ? 'bg-green-100 text-green-800' : '',
      type === 'error' ? 'bg-red-100 text-red-800' : '',
      type === 'warning' ? 'bg-yellow-100 text-yellow-800' : '',
      type === 'info' ? 'bg-blue-100 text-blue-800' : ''
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number; // thời gian tự ẩn (ms)
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 3000,
});

const visible = ref(true);

// Sau duration ms sẽ ẩn
watch(
  () => props.message,
  () => {
    visible.value = true;
    if (props.duration > 0) {
      setTimeout(() => (visible.value = false), props.duration);
    }
  },
  { immediate: true }
);
</script>
