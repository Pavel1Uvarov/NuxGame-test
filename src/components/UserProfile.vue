<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import IconProfile from '@/components/icons/IconProfile.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import VButton from '@/components/UI/VButton.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const { user } = storeToRefs(authStore);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <section class="profile shadow-md">
    <IconProfile class="profile-icon" />
    <div class="profile-info">
      <div>
        <h2>{{ user?.name }}</h2>
        <ul>
          <li><b>Email:</b> {{ user?.email }}</li>
          <li><b>Phone:</b> {{ user?.phone }}</li>
          <li>
            <b>Address:</b> {{ user?.address?.city }}, {{ user?.address?.street }},
            {{ user?.address?.suite }}
          </li>
          <li><b>Website:</b> {{ user?.website }}</li>
          <li><b>Company:</b> {{ user?.company?.name }}</li>
        </ul>
      </div>
      <v-button @click="handleLogout">
        <icon-logout width="20" />
      </v-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 8px;
  background-color: #f8f9fa;
  padding: 20px;

  &-icon {
    width: 20%;
    margin-right: 30px;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    width: 80%;

    ul {
      padding: 0;
      list-style: none;
    }
  }
}
</style>
