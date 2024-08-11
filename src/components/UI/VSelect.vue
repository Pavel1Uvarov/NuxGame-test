<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface ISelectProps {
  options: (string | number)[];
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
}

const model = defineModel<string | number | null | undefined>();

withDefaults(defineProps<ISelectProps>(), {
  disabled: false,
  label: '',
  errorMessage: '',
});
</script>

<template>
  <div class="custom-select">
    <label v-if="label">{{ label }}</label>
    <select v-model="model" :disabled="disabled">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.custom-select {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
}
</style>
