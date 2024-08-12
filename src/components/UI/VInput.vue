<script setup lang="ts">
interface IInputProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
}

const model = defineModel<string | null | undefined>();

withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  disabled: false,
  placeholder: '',
  label: '',
  errorMessage: '',
});
</script>

<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <input :type="type" v-model="model" :disabled="disabled" :placeholder="placeholder" />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    padding: 10px;

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
}
</style>
