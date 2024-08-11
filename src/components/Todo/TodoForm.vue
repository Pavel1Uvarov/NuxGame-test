<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todos';
import { type IFormTodo } from '@/types/todo.interface';
import VInput from '@/components/UI/VInput.vue';
import VButton from '@/components/UI/VButton.vue';
import VSelect from '@/components/UI/VSelect.vue';

const todosStore = useTodosStore();
const { usersIds } = storeToRefs(todosStore);

const showTodoForm = ref<boolean>(false);
const form = ref<IFormTodo>({
  title: '',
  userId: null,
});

const clearTodoForm = () => (form.value = { title: '', userId: null });

const handleToggleTodoForm = () => {
  if (showTodoForm.value) clearTodoForm();
  showTodoForm.value = !showTodoForm.value;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  await todosStore.storeTodo(form.value);

  handleToggleTodoForm();
};
</script>

<template>
  <section class="todo-form">
    <v-button @click="handleToggleTodoForm">
      {{ showTodoForm ? 'Hide Todo Form' : 'Show Todo Form' }}
    </v-button>
    <form class="shadow-md" v-show="showTodoForm" @submit="handleSubmit">
      <v-select v-model="form.userId" :options="usersIds" label="Select User ID" />
      <v-input v-model="form.title" label="Title" placeholder="Enter todo title" />
      <v-button type="submit" :disabled="!form.title || !form.userId">Add</v-button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
.todo-form {
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 20px;
    margin-top: 20px;
    background: white;

    button {
      width: 100%;
    }
  }
}
</style>
