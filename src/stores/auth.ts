import { defineStore } from 'pinia';
import type { IUser } from '@/types/user.interface';
import { useLocalStorage, type RemovableRef, StorageSerializers } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: (): { user: RemovableRef<IUser | null> } => ({
    user: useLocalStorage<IUser | null>('pinia/auth/user', null, {
      serializer: StorageSerializers.object,
    }),
  }),
  getters: {
    isUserAuth: (state) => state.user !== null,
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
