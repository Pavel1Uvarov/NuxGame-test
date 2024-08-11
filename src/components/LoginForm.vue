<script setup lang="ts">
import { useLoginForm } from '@/composables/useLoginForm';
import { useAuthApi } from '@/composables/api/useAuthApi';
import VInput from '@/components/UI/VInput.vue';
import VButton from '@/components/UI/VButton.vue';

const { defineField, handleSubmit, errors } = useLoginForm();
const { signIn, requestError } = useAuthApi();

const [username, usernameAttrs] = defineField('username');
const [phone, phoneAttrs] = defineField('phone');

const onSubmit = handleSubmit((values) => {
  signIn({
    username: values.username,
    phone: values.phone,
  });
});
</script>

<template>
  <div class="login-form">
    <header><h1>Login Form</h1></header>
    <form @submit="onSubmit" class="content">
      <v-input
        type="text"
        v-model="username"
        v-bind="usernameAttrs"
        :error-message="errors.username"
        placeholder="Username"
      ></v-input>
      <v-input
        type="text"
        v-model="phone"
        v-bind="phoneAttrs"
        :error-message="errors.phone"
        placeholder="Phone"
      ></v-input>
      <p v-if="requestError" class="error-message text-center">{{ requestError }}</p>
      <v-button type="submit">Submit</v-button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  padding: 0 030px 0;
  gap: 50px;
  border-radius: 5px;
  max-width: 447px;
  width: 100%;
  margin: 0 auto;

  header {
    text-align: center;
    background: #a5a5a5;
    padding: 15px 0;
    color: #5f5f5f;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    h1 {
      font-size: 17px;
      font-weight: 400;
      line-height: 21px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 15px 25px;
    background: #c3c3c3;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
