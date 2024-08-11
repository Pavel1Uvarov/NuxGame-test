<script setup lang="ts">
import type { ITodo } from '@/types/todo.interface';
import { useTodosStore } from '@/stores/todos';
import VButton from '@/components/UI/VButton.vue';
import { storeToRefs } from 'pinia';

defineProps<{
  item: ITodo;
}>();

const todosStore = useTodosStore();
const { favorites } = storeToRefs(todosStore);

const isFavorite = (id: number) => favorites.value.has(id);
</script>

<template>
  <div class="todo-item">
    <span :class="{ 'line-through': item.completed }">{{ item.title }}</span>
    <v-button @click="todosStore.toggleFavorite(item.id)">
      {{ isFavorite(item.id) ? 'Unfavorite' : 'Favorite' }}
    </v-button>
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;

  input[type='checkbox'] {
    margin-right: 10px;
  }
}
</style>
