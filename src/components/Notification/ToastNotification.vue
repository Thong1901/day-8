<!-- ToastNotification.vue -->
<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000 // 3 seconds
  },
  position: {
    type: String,
    default: 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center'
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close', 'update:show']);

const isVisible = ref(false);
let timer = null;

// Watch for show prop changes
watch(() => props.show, (newValue) => {
  if (newValue) {
    showToast();
  } else {
    hideToast();
  }
});

// Auto hide after duration
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      hideToast();
    }, props.duration);
  }
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

const showToast = () => {
  isVisible.value = true;
  startTimer();
};

const hideToast = () => {
  isVisible.value = false;
  clearTimer();
  emit('close');
  emit('update:show', false);
};

// Initialize on mount
onMounted(() => {
  if (props.show) {
    showToast();
  }
});

// Computed classes for different types and positions
const toastClasses = {
  base: 'fixed z-50 p-4 rounded-lg shadow-lg transition-all duration-300 min-w-80 max-w-md',
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  positions: {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2'
  }
};

const getToastClass = () => {
  return [
    toastClasses.base,
    toastClasses[props.type],
    toastClasses.positions[props.position]
  ].join(' ');
};

// Icons for different types
const getIcon = () => {
  const icons = {
    success: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>`,
    error: `<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>`,
    warning: `<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>`,
    info: `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>`
  };
  return icons[props.type] || icons.info;
};
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform translate-x-2"
    enter-to-class="opacity-100 transform translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-x-0"
    leave-to-class="opacity-0 transform translate-x-2"
  >
    <div v-if="isVisible" :class="getToastClass()">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- Icon -->
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path v-html="getIcon()"></path>
          </svg>
          <span class="font-medium">{{ message }}</span>
        </div>
        
        <!-- Close Button -->
        <button 
          v-if="closable"
          @click="hideToast" 
          class="ml-4 text-current hover:text-opacity-75 transition-colors duration-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      
      <!-- Progress Bar (optional) -->
      <div v-if="duration > 0" class="absolute bottom-0 left-0 h-1 bg-black bg-opacity-20 rounded-b-lg overflow-hidden">
        <div 
          class="h-full bg-white bg-opacity-50 transition-all linear"
          :style="{ 
            width: '100%', 
            animationDuration: duration + 'ms',
            animation: 'progress-bar linear forwards'
          }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes progress-bar {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>