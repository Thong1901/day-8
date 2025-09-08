<script setup>
import { useRouter } from 'vue-router';
import { LoginUser } from '../controllers/Users';
import { ref, onMounted, onUnmounted } from 'vue';
import Cookies from 'js-cookie';
import { definePage } from 'vue-router/auto';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

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

const handleLogin = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const res = await LoginUser({
      email: email.value,
      password: password.value,
    });

    console.log('Login success:', res);

    if (res.token) {
      if (rememberMe.value) {
        Cookies.set('token', res.token, { expires: 30, secure: true, sameSite: 'strict' });
      } else {
        Cookies.set('token', res.token, { secure: true, sameSite: 'strict' });
      }

      if (res.user) {
        Cookies.set('user', JSON.stringify(res.user), {
          expires: rememberMe.value ? 30 : undefined,
          secure: true,
          sameSite: 'strict'
        });
      }

      alert('Login successful!');
      router.push('/');
    } else {
      errorMessage.value = 'No token received from server';
      alert('Login failed: No token received');
    }
  } catch (err) {
    console.error('Login error:', err);

    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || 'Login failed';

      if (status === 401) {
        errorMessage.value = 'Invalid email or password';
      } else if (status === 429) {
        errorMessage.value = 'Too many login attempts. Please try again later.';
      } else {
        errorMessage.value = message;
      }
    } else if (err.request) {
      errorMessage.value = 'Network error. Please check your connection.';
    } else {
      // Lỗi khác
      errorMessage.value = 'An unexpected error occurred.';
    }

    alert(`Failed to login: ${errorMessage.value}`);
  } finally {
    isLoading.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};


definePage({
  meta: {
    layout: 'auth'
  }
})


</script>

<template>
  <div class="flex h-screen -m-2 flex-col md:flex-row">
    <!-- Sidebar -->
    <div
      :class="[
        'w-full md:w-5/12 bg-blue-900 flex justify-center items-center text-white clip-custom transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="relative z-10 text-center p-6 md:p-0">
        <h1 class="text-2xl md:text-3xl font-bold mb-4">
          A few more clicks to sign in to your account.
        </h1>
        <p class="text-sm md:text-base text-blue-200">
          Manage all your e-commerce accounts in one place
        </p>
      </div>
    </div>

    <!-- Login form -->
    <div class="w-full md:w-7/12 flex justify-center items-center p-6">
      <div class="w-full max-w-md">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
          Sign In
        </h2>

        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {{ errorMessage }}
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            :disabled="isLoading"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            :disabled="isLoading"
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                v-model="rememberMe"
                :disabled="isLoading"
                class="form-checkbox text-blue-600 rounded disabled:cursor-not-allowed"
              />
              Remember me
            </label>
            <a href="#" class="text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="isLoading" class="mr-2">
                <svg
                  class="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ isLoading ? "Logging in..." : "Login" }}
            </button>

            <button
              type="button"
              :disabled="isLoading"
              class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition duration-300 font-semibold disabled:bg-gray-100 disabled:cursor-not-allowed"
              @click="goToRegister"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.clip-custom {
  clip-path: ellipse(80% 100% at 20% 45%);
}
</style>