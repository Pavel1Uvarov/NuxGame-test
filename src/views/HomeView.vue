<script setup lang="ts">
import UserProfile from '@/components/UserProfile.vue';
import TodoList from '@/components/Todo/TodoList.vue';
import { onBeforeMount } from 'vue';
import TodoFilter from '@/components/Todo/TodoFilter.vue';
import { useTodosStore } from '@/stores/todos';
import TodoForm from '@/components/Todo/TodoForm.vue';

const todosStore = useTodosStore();

onBeforeMount(async () => {
  await todosStore.fetchTodos();
});
</script>

<template>
  <main class="container">
    <user-profile />
    <todo-form />
    <todo-filter />
    <todo-list />
  </main>
</template>
