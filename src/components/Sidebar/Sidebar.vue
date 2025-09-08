<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import SidebarSubmenu from "./SidebarSubmenu.vue";
</script>

<template>
  <aside class="w-64 bg-blue-900 text-white min-h-screen p-4">
    <div class="text-xl font-bold mb-6">Rubick</div>

    <!-- Users -->
    <SidebarSubmenu icon="i-lucide-users" label="Users">
      <SidebarItem label="Layout 1" to="/users/layout1" />
      <SidebarItem label="Layout 2" to="/users/layout2" />
      <SidebarItem label="Layout 3" to="/users/layout3" />
    </SidebarSubmenu>

    <!-- Profile -->
    <SidebarSubmenu icon="i-lucide-user" label="Profile">
      <SidebarItem label="Overview" to="/profile/overview" />
      <SidebarItem label="Settings" to="/profile/settings" />
    </SidebarSubmenu>
  </aside>
</template>
