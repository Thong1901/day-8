<script setup>
import Input from '../components/InputComponent/input.vue';
import Avatar from '../components/AvatarComponent/avatar.vue';
</script>
<template>
  <div class="ml-6 h-200 p-4 sm:p-6 lg:p-8 max-w-8xl mx-auto bg-gray-100 rounded-3xl mt-10 overflow-auto">
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
  </div>
</template>