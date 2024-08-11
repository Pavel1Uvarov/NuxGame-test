import { fetchUsers } from '@/api/usersApi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { HOME_PAGE_NAME } from '@/constants/router';
import { useAuthStore } from '@/stores/auth';

export function useAuthApi() {
  const requestError = ref<string | null>(null);
  const userStore = useAuthStore();
  const router = useRouter();

  const signIn = async ({ username, phone }: { username: string; phone: string }) => {
    requestError.value = null;

    const users = await fetchUsers();
    const user = users.find((u) => u.phone === phone && u.username === username);

    if (!user) {
      requestError.value = 'Invalid username or phone number';
      return;
    }

    userStore.setUser(user);

    await router.push({ name: HOME_PAGE_NAME });
  };

  return { signIn, requestError };
}
