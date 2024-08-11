import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import VInput from '@/components/UI/VInput.vue';
import VButton from '@/components/UI/VButton.vue';

const signIn = vi.fn();
const requestError = ref<string | null>(null);

vi.mock('@/composables/useLoginForm', () => ({
  useLoginForm: () => ({
    defineField: (name: string) => [ref(''), { name }],
    handleSubmit: (callback: (values: any) => void) => (e: Event) => {
      e.preventDefault();
      callback({ username: 'testuser', phone: '1234567890' });
    },
    errors: {},
  }),
}));

vi.mock('@/composables/api/useAuthApi', () => ({
  useAuthApi: () => ({
    signIn: signIn,
    requestError: requestError,
  }),
}));

describe('LoginForm.vue', () => {
  it('renders the form and its elements correctly', () => {
    const wrapper = mount(LoginForm, {
      global: {
        components: {
          VInput,
          VButton,
        },
      },
    });

    expect(wrapper.find('h1').text()).toBe('Login Form');
    expect(wrapper.findComponent(VInput).exists()).toBe(true);
    expect(wrapper.findComponent(VButton).exists()).toBe(true);
  });

  it('submits the form with correct data', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        components: {
          VInput,
          VButton,
        },
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(signIn).toHaveBeenCalledOnce();
  });

  it('displays error message when requestError is set', async () => {
    requestError.value = 'An error occurred';

    const wrapper = mount(LoginForm, {
      global: {
        components: {
          VInput,
          VButton,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('.error-message');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('An error occurred');
  });
});
