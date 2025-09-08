<script setup>
import SidebarItem from '@/components/Sidebar/SidebarItem.vue'
import SidebarSubmenu from '@/components/Sidebar/SidebarSubmenu.vue'
import Cookies from 'js-cookie'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarOpen = ref(true) 

const handleLogout = () => {
  Cookies.remove("token", { path: "/" })
  Cookies.remove("user", { path: "/" })
  window.location.href = "/login"
}
const closeSidebarOnResize = () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }else{
    sidebarOpen.value = true
  }
}
onMounted(() => {
  window.addEventListener('resize', closeSidebarOnResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', closeSidebarOnResize)
})
</script>

<template>
  <div class="-m-2 flex bg-gradient-to-r from-blue-900 to-blue-50">
    <!-- Sidebar -->
    <aside :class="[
      'fixed md:static inset-y-0 left-0 w-60 bg-gradient-to-b from-blue-900 to-blue-900 text-white shadow-xl border-r border-white/10 transform transition-transform duration-300 z-50',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <!-- Logo -->
      <div class="p-6 border-b border-white/20 bg-black/10 backdrop-blue-900 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div
            class="w-6 h-6 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">R</span>
          </div>
          <span class="text-1xl font-bold bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
            Rubick
          </span>
        </div>
        <!-- Close button on mobile -->
        <button class="md:hidden text-white" @click="sidebarOpen = false">
          ✕
        </button>
      </div>

      <!-- Menu -->
      <nav class="h-screen flex flex-col mt-6 gap-2 px-4 pb-6 pr-0 overflow-y-auto">


        <!-- Users -->
        <SidebarSubmenu label="Users" icon="i-lucide-users">
          <SidebarItem label="Layout 1" to="/Users/layout1" icon="i-lucide-user" />
          <SidebarItem label="Create User" to="/Users/create" icon="i-lucide-user-check" />
        </SidebarSubmenu>

        <!-- Profile -->
        <SidebarItem label="Profile" to="/Users/profile" icon="i-lucide-id-card" />

        <!-- Pages -->
        <SidebarSubmenu label="Pages" icon="i-lucide-file-text">
          <SidebarItem label="Login" to="/login" icon="i-lucide-log-in" />
          <SidebarItem label="Register" to="/register" icon="i-lucide-user-plus" />
          <SidebarItem label="Forgot Password" to="/forgot-password" icon="i-lucide-lock" />
          <SidebarItem label="404 Error" to="/404" icon="i-lucide-alert-circle" />
        </SidebarSubmenu>

        <div class="mt-4">
          <button class="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            @click="handleLogout">
            Đăng xuất
          </button>
        </div>
      </nav>
    </aside>

    <!-- Overlay khi mở sidebar trên mobile -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-40 md:hidden" @click="sidebarOpen = false"></div>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto bg-blue-900">
      <!-- Header bar -->
      <header class="">
        <!-- Nút mở sidebar mobile -->
        <button class="md:hidden text-gray-700 dark:text-white" @click="sidebarOpen = true">
          ☰
        </button>
      </header>

      <!-- Main content area -->
      <div class="pl-0 pr-6 pb-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>
