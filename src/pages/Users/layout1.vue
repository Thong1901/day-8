<script setup lang="ts">
import Button from '../../components/ButtonComponent/button.vue';
import Input from '../../components/InputComponent/input.vue';
import UserCard from '../../components/Usercard/Usercard.vue';
import { ref, computed, onMounted } from 'vue';
import { getUsers } from '../../controllers/Users';
import Avatar from "../../components/AvatarComponent/avatar.vue"

const search = ref('');
const users = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await getUsers();
    users.value = data;
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    loading.value = false;
  }
});

// filter theo search
const filteredUsers = computed(() =>
  users.value.filter(u =>
    (`${u.firstname} ${u.lastname}`).toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
<div class="ml-6 p-4 sm:p-6 lg:p-8 max-w-8xl mx-auto bg-gray-100 rounded-3xl mt-10 min-h-[30rem] ">

    <div class="flex md:flex-row w-full top-0 border-b-4 border-black flex justify-between items-center">
      <div class="flex md:flex-row">
        <a href="#" class="l">Application</a>
        <div class="ml-2 mr-2"> › </div>
        <div>Dashboard</div>
      </div>
      <div class="flex md:flex-row">
        <Input v-model="search" placeholder="Search..." class="pr-2 w-full " />
        <div icon="i-lucide-users" class="mr-4">🔔</div>
        <Avatar
          :src="'https://i.pravatar.cc/100?u=1'"
          size="48px"
          rounded="full"
        />
      </div>
    </div>
    <div class="mt-2 font-semibold text-lg">Users Layout</div>
    <div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
        <!-- Buttons -->
        <div class="flex gap-2">
          <Button variant="primary">Add New User</Button>
          <Button variant="outline">+</Button>
        </div>

        <!-- Info -->
        <div class="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Showing {{ filteredUsers.length }} of {{ users.length }} entries
        </div>

        <!-- Search -->
        <div class="relative w-full md:w-64">
          <Input v-model="search" placeholder="Search..." class="pr-10 w-full" />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-5 text-gray-500">Loading users...</div>

      <!-- Users grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 ">
        <UserCard 
        v-for="u in filteredUsers" 
        :key="u.userid" 
        :id="u.userid" 
        :firstname="u.firstname"
        :lastname="u.lastname" 
        :email="u.email" 
        :avatar-url="u.avatarUrl || `https://i.pravatar.cc/100?u=${u.userid}`"
          @update="() => console.log('Update', u.userid)" 
          @delete="() => console.log('Delete', u.userid)" />
      </div>
    </div>
  </div>
</template>
