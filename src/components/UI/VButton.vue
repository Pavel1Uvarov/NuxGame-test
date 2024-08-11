<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface ButtonProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  type: 'button',
});

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="['custom-button', { 'custom-button--disabled': disabled }]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #519945;
  color: #fff;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #498b3e;
  }

  &--disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
}
</style>
