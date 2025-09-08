<script setup lang="ts">
import { RouterLink } from "vue-router";

interface Props {
  icon?: string;
  label: string;
  to: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="to"
    class="flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200
           text-gray-200 hover:bg-white/10 no-underline
           dark:text-gray-300 dark:hover:bg-slate-700"
    active-class="bg-white/20 text-white font-semibold"
  >
    <i v-if="icon" :class="icon"></i>
    <span>{{ label }}</span>
  </RouterLink>
</template>
