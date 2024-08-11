<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const TodoItem = defineAsyncComponent(() => import('@/components/Todo/TodoItem.vue'));

const todosStore = useTodosStore();
const { filteredTodos } = storeToRefs(todosStore);
</script>

<template>
  <section class="todo-list shadow-md">
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <todo-item :item="todo" />
      </li>
      <li v-show="!filteredTodos.length">No available todos.</li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.todo-list {
  width: 100%;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 20px;

  ul {
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 20px;
    }
  }
}
</style>
