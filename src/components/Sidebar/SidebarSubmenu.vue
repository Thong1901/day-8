<script setup lang="ts">
import { ref } from "vue";

interface Props {
  icon?: string;
  label: string;
}

const props = defineProps<Props>();
const open = ref(false);
</script>

<template>
  <div>
    <!-- Nút mở/đóng submenu -->
    <button
      class="relative border-0 flex w-full h-10 items-center justify-between px-4 py-2 rounded-l-full transition-colors duration-200 overflow-hidden"
      :class="open 
        ? 'bg-gray-100 text-gray-600 font-bold dark:bg-gray-200 dark:text-black  active-shape' 
        : 'border-0 bg-blue-900 font-bold text-white hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-r-full'"
      @click="open = !open"
    >
      <div class="flex items-center gap-2">
        <i v-if="props.icon" :class="props.icon"></i>
        <span>{{ props.label }}</span>
      </div>
      <i :class="open ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"></i>
    </button>

    <!-- Nội dung submenu -->
    <transition name="fade">
      <div v-if="open" class="ml-4 mt-1 flex flex-col gap-1">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Khi mở, thêm pseudo-element tạo hiệu ứng bo lồi bên phải */
.active-shape::after {
  content: "";
  position: absolute;
  top: 0;
  right: -20px; 
  width: 40px;
  height: 100%;
  background: inherit; 
  border-radius: 9999px; 
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
