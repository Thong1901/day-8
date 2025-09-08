<script setup>
import { ref,onMounted,onUnmounted } from "vue";
import { RegisterUser } from "../controllers/Users";
import { definePage } from "vue-router/auto";

// State cho form
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

// State cho toast notification
const showToast = ref(false);
const toastType = ref(""); // 'success' hoặc 'error'
const toastMessage = ref("");



const sidebarOpen = ref(false)

const closeSidebarOnResize = () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
}
onMounted(() => {
  window.addEventListener('resize', closeSidebarOnResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', closeSidebarOnResize)
})
// Hàm hiển thị toast
const showToastNotification = (type, message) => {
  toastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  
  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Hàm đóng toast
const closeToast = () => {
  showToast.value = false;
};

// Xử lý submit form
const goToLogin = () => {
  window.location.href = "/login"; 
};

const handleRegisterClick = async () => {
  // Reset messages
  errorMessage.value = "";
  successMessage.value = "";
  
  // Validation
  if (!firstName.value.trim()) {
    showToastNotification("error", "Please enter your first name!");
    return;
  }
  
  if (!lastName.value.trim()) {
    showToastNotification("error", "Please enter your last name!");
    return;
  }
  
  if (!email.value.trim()) {
    showToastNotification("error", "Please enter your email!");
    return;
  }
  
  if (!password.value) {
    showToastNotification("error", "Please enter your password!");
    return;
  }
  
  if (password.value.length < 6) {
    showToastNotification("error", "Password must be at least 6 characters!");
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    showToastNotification("error", "Passwords do not match!");
    return;
  }
  
  isLoading.value = true;
  
  try {
    await RegisterUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    
    showToastNotification("success", "Registration successful! Redirecting...");
    
    // Redirect sau 2 giây để user có thể thấy thông báo thành công
    setTimeout(() => {
      // router.push("/sidebar");
      window.location.href = "/login";
    }, 2000);
    
  } catch (err) {
    console.error(err);
    const errorMsg = err.response?.data?.message || "Failed to register. Please try again!";
    showToastNotification("error", errorMsg);
  } finally {
    isLoading.value = false;
  }
};

definePage({
  meta: {
    layout: 'auth'
  }
})
</script>

<template>
  <div class="flex h-screen -m-2 flex-col md:flex-row">
    <!-- Toast Notification -->
    <div
      v-if="showToast"
      :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 min-w-80',
        toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <!-- Success Icon -->
          <svg v-if="toastType === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <!-- Error Icon -->
          <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
          <span>{{ toastMessage }}</span>
        </div>
        <button @click="closeToast" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Bên trái -->
    <div class="w-full md:w-6/12 bg-blue-900 flex items-center justify-center text-white clip-custom p-6">
      <div class="relative z-10 text-center">
        <h1 class="text-2xl md:text-3xl font-bold mb-4">
          A few more clicks to create your account.
        </h1>
        <p class="text-sm md:text-base text-blue-200">
          Manage all your e-commerce accounts in one place
        </p>
      </div>
    </div>

    <!-- Bên phải -->
    <div class="w-full md:w-6/12 flex justify-center items-center p-6">
      <div class="w-full max-w-md">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 text-center">Sign Up</h2>

        <!-- Form Messages -->
        <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {{ successMessage }}
        </div>

        <form class="space-y-5 flex flex-col mt-6" @submit.prevent="handleRegisterClick">
          <input v-model="firstName" type="text" placeholder="First Name"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading" />

          <input v-model="lastName" type="text" placeholder="Last Name"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading" />

          <input v-model="email" type="email" placeholder="Email"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading" />

          <input v-model="password" type="password" placeholder="Password"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading" />

          <input v-model="confirmPassword" type="password" placeholder="Confirm Password"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :disabled="isLoading" />

          <div class="flex gap-4 mt-6">
            <button type="submit" :disabled="isLoading"
              class="flex-1 bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>

            <button type="button" :disabled="isLoading"
              class="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              @click="goToLogin">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style>
.clip-custom {
  clip-path: ellipse(80% 100% at 20% 46%);
}

/* Toast animation */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter-active {
  animation: slideInRight 0.3s ease-out;
}
</style>