<template>
  <div class="p-6 h-200 max-w-8xl mx-auto bg-gray-100 rounded-3xl mt-10">
    <!-- Form Title -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Form Layout</h2>

    <!-- Form Card -->
    <div class="h-125 w-120 bg-white rounded-lg shadow-md p-6 space-y-5">
      
      <!-- Name -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
        <input v-model="form.fullName" type="text" placeholder="Enter full name"
          class=" w-115 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"/>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
        <input v-model="form.email" type="email" placeholder="Enter email"
          class="w-115 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"/>
      </div>

      <!-- Instagram -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Instagram</label>
        <input v-model="form.instagram" type="text" placeholder="Instagram username"
          class="w-115 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"/>
      </div>

      <!-- Twitter -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Twitter</label>
        <input v-model="form.twitter" type="text" placeholder="Twitter handle"
          class="w-115 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"/>
      </div>

      <!-- Avatar URL -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Avatar URL</label>
        <input v-model="form.avatarUrl" type="url" placeholder="https://..."
          class="w-115 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"/>
      </div>

      <!-- Role -->
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1">Role</label>
        <select v-model="form.role" class="w-121 border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none">
          <option>Backend Engineer</option>
          <option>Frontend Engineer</option>
          <option>UI/UX Designer</option>
          <option>Project Manager</option>
        </select>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button @click="handleSave"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Save
        </button>
      </div>
     <Notification :message="notification.message" :type="notification.type" />
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { createUser } from "../../controllers/Users"
import Notification from "../../components/createNotification.vue"

const form = ref({
  fullName: "",
  email: "",
  instagram: "",
  twitter: "",
  avatarUrl: "",
  role: ""
})

const notification = ref({ message: "", type: "info" })

const handleSave = async () => {
  try {
    const res = await createUser(form.value)
    console.log("User created:", res)

    // ✅ Hiển thị thông báo
    notification.value = { message: "User created successfully!", type: "success" }

    // ✅ Reset form sau khi thành công
    form.value = {
      fullName: "",
      email: "",
      instagram: "",
      twitter: "",
      avatarUrl: "",
      role: ""
    }
  } catch (error) {
    console.error("Error saving user:", error)
    notification.value = { message: "Failed to create user!", type: "error" }
  }
}
</script>