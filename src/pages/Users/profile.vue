<script setup lang="ts">
import Avatar from '../../components/AvatarComponent/avatar.vue';
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';


import { getUserById } from "../../controllers/Users";

import { useUserStore } from "../../store/user"
const userStore = useUserStore()

const props = withDefaults(
    defineProps<{
        userid?: number
    }>(),
    {
        userid: 1,
    }
)

const user = ref<any>(null)
onMounted(async () => {
  const id = userStore.userid || 1;
  if (!id) return 
  const res = await getUserById(id)
  user.value = res
})
const activeTab = ref("Dashboard")
</script>

<template>
    <div class="p-6 max-w-8xl mx-auto bg-gray-100 rounded-3xl mt-10">
        <div v-if="user" class="w-full bg-white rounded-lg shadow-t-md shadow-l-md shadow-r-md flex divide-x">


            <div class="flex-1 flex items-center gap-6 p-6">
                <div class="relative">
                    <Avatar :src="user.avatarurl || 'https://i.pravatar.cc/100?img=6'" alt="User Avatar" size="120px"
                        rounded="full" />
                    <div
                        class="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-md">
                        <i class="fas fa-camera"></i>
                    </div>
                </div>
                <div>
                    <h2 class="text-lg font-semibold m-0 text-gray-600">{{ user.firstname + ' ' + user.lastname }}</h2>
                    <p class="text-gray-500 m-0">{{ user.role }}</p>
                </div>
            </div>

            <!-- Contact Details -->
            <div class="flex-1 flex flex-col justify-center p-6">
                <h4 class="font-semibold mb-3 text-gray-600">Contact Details</h4>
                <ul class="space-y-2 text-gray-600">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-envelope text-gray-500"></i> {{ user.email }}
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fab fa-instagram text-pink-500"></i> {{ user.instagram }}
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fab fa-twitter text-blue-400"></i> {{ user.twitter }}
                    </li>
                </ul>
            </div>

            <!-- Sales Growth -->
            <div class="flex-1 flex flex-col justify-center p-6">
                <h4 class="font-semibold mb-3 text-gray-600">Sales Growth</h4>
                <div class="space-y-2">
                    <div class="flex items-center gap-2">
                        <span>USP:</span> <span class="text-green-600 font-medium">+23%</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span>STP:</span> <span class="text-red-600 font-medium">-2%</span>
                    </div>
                </div>
                <div class="mt-4 h-16 bg-gray-100 rounded"></div>
            </div>
        </div>

        <div v-else class="text-center py-10 text-gray-500">
            Loading user profile...
        </div>

        <!-- Tabs -->
        <div class="flex h-10 w-full bg-white rounded-b-lg">
            <div class="flex h-10 w-full bg-white rounded-b-lg">
                <button v-for="tab in ['Dashboard', 'Account & Profile', 'Activities', 'Tasks']" :key="tab"
                    @click="activeTab = tab" :class="[
                        'm-3 font-bold text-gray-700 border-0 bg-white transition',
                        activeTab === tab
                            ? 'border-b-2 border-b-blue-500 text-blue-600'
                            : 'hover:border-b-2 hover:border-b-blue-300'
                    ]">
                    {{ tab }}
                </button>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            <!-- Top Categories -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-700">Top Categories</h3>
                    <button class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">Wordpress Template</p>
                            <p class="text-sm text-gray-500">HTML, PHP, Mysql</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-gray-700 font-semibold">6.5k</span>
                            <span class="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">+150</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">Bootstrap HTML Template</p>
                            <p class="text-sm text-gray-500">HTML, PHP, Mysql</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-gray-700 font-semibold">2.5k</span>
                            <span class="text-orange-600 bg-orange-100 px-2 py-1 rounded text-sm">+150</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">Tailwind HTML Template</p>
                            <p class="text-sm text-gray-500">HTML, PHP, Mysql</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-gray-700 font-semibold">3.4k</span>
                            <span class="text-blue-600 bg-blue-100 px-2 py-1 rounded text-sm">+150</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Work In Progress -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-700">Work In Progress</h3>
                    <div class="flex gap-4 text-sm font-medium">
                        <span class="text-blue-600 border-b-2 border-blue-600">New</span>
                        <span class="text-gray-400">Last Week</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Pending Tasks</p>
                        <div class="w-full bg-gray-200 rounded h-2">
                            <div class="bg-blue-600 h-2 rounded" style="width:20%"></div>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Completed Tasks</p>
                        <div class="w-full bg-gray-200 rounded h-2">
                            <div class="bg-blue-600 h-2 rounded" style="width:10%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">2 / 20</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Tasks In Progress</p>
                        <div class="w-full bg-gray-200 rounded h-2">
                            <div class="bg-blue-600 h-2 rounded" style="width:70%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">42</p>
                    </div>
                    <button class="mt-4 bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200">
                        View More Details
                    </button>
                </div>
            </div>

            <!-- Daily Sales -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-700">Daily Sales</h3>
                    <button class="flex items-center gap-2 border px-3 py-1 rounded text-gray-600 text-sm">
                        <i class="fas fa-download"></i> Download Excel
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/40?img=1" class="w-10 h-10 rounded-full" />
                        <div class="flex-1">
                            <p class="font-medium">Charlize Theron</p>
                            <p class="text-sm text-gray-500">Bootstrap 4 HTML Admin Template</p>
                        </div>
                        <span class="font-medium text-green-600">+$19</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/40?img=2" class="w-10 h-10 rounded-full" />
                        <div class="flex-1">
                            <p class="font-medium">Nicolas Cage</p>
                            <p class="text-sm text-gray-500">Tailwind HTML Admin Template</p>
                        </div>
                        <span class="font-medium text-green-600">+$25</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/40?img=3" class="w-10 h-10 rounded-full" />
                        <div class="flex-1">
                            <p class="font-medium">Kate Winslet</p>
                            <p class="text-sm text-gray-500">VueJs HTML Admin Template</p>
                        </div>
                        <span class="font-medium text-green-600">+$21</span>
                    </div>
                </div>
            </div>

            <!-- Latest Tasks -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-700">Latest Tasks</h3>
                    <div class="flex gap-4 text-sm font-medium">
                        <span class="text-blue-600 border-b-2 border-blue-600">New</span>
                        <span class="text-gray-400">Last Week</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Create New Campaign</p>
                            <p class="text-sm text-gray-500">10:00 AM</p>
                        </div>
                        <input type="checkbox" class="toggle-checkbox">
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Meeting With Client</p>
                            <p class="text-sm text-gray-500">02:00 PM</p>
                        </div>
                        <input type="checkbox" class="toggle-checkbox">
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Create New Repository</p>
                            <p class="text-sm text-gray-500">04:00 PM</p>
                        </div>
                        <input type="checkbox" class="toggle-checkbox">
                    </div>
                </div>
            </div>

        </div>



        <RouterView />
    </div>
</template>
