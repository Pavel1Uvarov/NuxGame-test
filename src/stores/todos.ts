import { defineStore } from 'pinia';
import type { IFormTodo, ITodo } from '@/types/todo.interface';
import { type TFilter } from '@/types/filters.type';
import { getTodos, store } from '@/api/todosApi';
import { useLocalStorage } from '@vueuse/core';
import { toast } from 'vue3-toastify';

interface Store {
  todos: ITodo[];
  usersIds: number[];
  favorites: Map<number, boolean>;
  filters: TFilter;
}

export const useTodosStore = defineStore('todos', {
  state: (): Store =>
    <Store>{
      todos: [],
      usersIds: [],
      favorites: new Map(
        useLocalStorage<number[]>('pinia/todos/user', []).value.map((id) => [id, true]),
      ),
      filters: {
        byStatus: 'All',
        byUserId: 'All Users',
        search: '',
      },
  },
  actions: {
    async fetchTodos() {
      try {
        const data = await getTodos();
        this.todos = data;
        this.usersIds = Array.from(new Set(data.map((todo) => todo.userId)));
      } catch (err) {
        toast('Error fetching todos');
        return;
      }
    },
    async storeTodo(todo: IFormTodo) {
      try {
        const response = await store(todo);

        this.todos.push({
          ...response.data,
          id: Math.random() * 100,
          completed: false,
        });

        toast('New todo added successfully.');
      } catch (err) {
        toast('Error storing todo');
        return;
      }
    },
    setFilters(newFilters: TFilter) {
      this.filters = newFilters;
    },
    toggleFavorite(newFavorite: number) {
      if (this.favorites.has(newFavorite)) {
        this.favorites.delete(newFavorite);
        toast('Item was removed from favorites.');
      } else {
        this.favorites.set(newFavorite, true);
        toast('Item was added to favorites.');
      }
    },
  },
});
