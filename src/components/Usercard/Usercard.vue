<template>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <div class="flex flex-wrap flex-col lg:flex-row items-center justify-between gap-4 mb-4">

      <div class="flex flex-col flex-wrap lg:flex-row items-center gap-3 w-full sm:w-auto">
        <Avatar :src="avatarUrl ?? 'https://via.placeholder.com/150'" :alt="firstname + ' ' + lastname" size="48px"
          rounded="full" />
        <div class="truncate text-center sm:text-left w-full sm:w-auto min-w-0">
          <h2 class="font-semibold text-base m-0 text-gray-600">
            {{ firstname + ' ' + lastname }}
          </h2>
          <p class="text-gray-500 text-sm truncate m-0">{{ email }}</p>
        </div>
      </div>

      <div class="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-center md:justify-end">
        <CircleButton to="https://facebook.com" external v-tippy="'Facebook'">
          <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
        </CircleButton>
        <CircleButton to="https://twitter.com" external v-tippy="'Twitter'">
          <FontAwesomeIcon :icon="['fab', 'twitter']" />
        </CircleButton>
        <CircleButton to="https://linkedin.com" external v-tippy="'Linked In'">
          <FontAwesomeIcon :icon="['fab', 'linkedin']" />
        </CircleButton>
      </div>
    </div>

    <div class="flex flex-wrap flex-col lg:flex-row items-center justify-between mt-6 gap-4">
      <div class="flex flex-col gap-1 w-full max-w-sm md:max-w-none md:flex-1 md:pr-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{{ progress }}%</span>
        </div>
        <Progress :value="progress" color="bg-blue-800" :showLabel="false" />
      </div>
      <div class="flex justify-center lg:justify-end gap-3 w-full md:w-auto md:flex-shrink-0">
        <Button variant="primary">Message</Button>
        <Button variant="outline" @click="goToProfile">Profile</Button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Button from '../ButtonComponent/button.vue';
import Progress from '../ProgressComponent/progress.vue';
import Avatar from '../AvatarComponent/avatar.vue';
import CircleButton from '../ButtonComponent/CircleButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "../../store/user";

const userStore = useUserStore();
userStore.setUser(1);

interface Props {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatarUrl?: string;
}

const { id, firstname, lastname, email, avatarUrl } = defineProps<Props>();
const progress = ref(20);
const router = useRouter();

const goToProfile = () => {
  userStore.setUser(id);
  router.push('/Users/profile');
};
</script>

<style scoped>
/* Đảm bảo text không bị overflow */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Responsive adjustments để đảm bảo layout ổn định */
@media (max-width: 640px) {
  .truncate {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}
</style>