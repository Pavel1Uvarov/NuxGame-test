<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent } from 'vue';
import { Statuses } from "@/types/filters.type";

const TodoItem = defineAsyncComponent(() => import('@/components/Todo/TodoItem.vue'));

const todosStore = useTodosStore();
const { filters, todos, favorites } = storeToRefs(todosStore);

const filteredTodos = computed(() => {
  const { byStatus, byUserId, search } = filters.value;
  const searchLower = search.toLowerCase();

  let filtered = todos.value;
  if (byStatus !== Statuses.ALL) {
    filtered = filtered.filter((todo) => {
      if (byStatus === Statuses.COMPLETED) return todo.completed;
      if (byStatus === Statuses.UNCOMPLETED) return !todo.completed;
      if (byStatus === Statuses.FAVORITES) return favorites.value.has(todo.id);
      return true;
    });
  }

  if (byUserId !== 'All Users') {
    const userId = Number(byUserId);
    filtered = filtered.filter((todo) => todo.userId === userId);
  }

  if (search) {
    filtered = filtered.filter((todo) => todo.title.toLowerCase().includes(searchLower));
  }

  return filtered;
})
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
