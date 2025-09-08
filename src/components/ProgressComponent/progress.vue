<template>
  <div class="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden shadow-sm">
    <div
      class="h-1.5 rounded-full transition-all duration-300 ease-in-out"
      :class="color"
      :style="{ width: percent + '%' }"
    ></div>
  </div>
  <p v-if="showLabel" class="text-sm mt-1 text-gray-600 text-right">
    {{ percent }}%
  </p>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, default: 100 },
  color: { type: String, default: "bg-blue-500" }, 
  showLabel: { type: Boolean, default: true }
});

const percent = computed(() =>
  Math.min(100, Math.max(0, Math.round((props.value / props.max) * 100)))
);
</script>