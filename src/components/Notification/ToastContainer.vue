<script setup lang="ts">
import { computed } from 'vue'
import { useToast, type Toast } from '../../composable/useToast'

const { toasts, removeToast } = useToast()

// computed để lấy toast hiện tại
const activeToasts = computed(() => toasts.value)
</script>

<template>
  <div>
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in activeToasts"
        :key="toast.id"
        :class="['fixed z-50 p-4 rounded shadow-lg min-w-[250px] max-w-md', 
                 toast.type === 'success' ? 'bg-green-500 text-white' :
                 toast.type === 'error' ? 'bg-red-500 text-white' :
                 toast.type === 'warning' ? 'bg-yellow-500 text-black' :
                 'bg-blue-500 text-white',
                 toast.position.includes('top') ? 'top-4' : 'bottom-4',
                 toast.position.includes('right') ? 'right-4' : 'left-4']"
      >
        <div class="flex justify-between items-center">
          <span>{{ toast.message }}</span>
          <button v-if="toast.closable" @click="removeToast(toast.id)" class="ml-4 font-bold">x</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
