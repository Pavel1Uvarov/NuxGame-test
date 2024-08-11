import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import UserProfile from '../UserProfile.vue';
import { useAuthStore } from '../../stores/auth';

describe('UserProfile.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders user profile information correctly', () => {
    const authStore = useAuthStore();
    authStore.setUser({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
    const wrapper = mount(UserProfile);

    expect(wrapper.find('h2').text()).toBe('Leanne Graham');
    expect(wrapper.find('li').text()).toContain('Email: Sincere@april.biz');
  });
});
