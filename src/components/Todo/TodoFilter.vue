<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { statusesOptions } from '@/types/filters.type';
import VInput from '@/components/UI/VInput.vue';
import VSelect from '@/components/UI/VSelect.vue';
import { computed } from 'vue';

const todosStore = useTodosStore();
const { filters, usersIds } = storeToRefs(todosStore);

const search = () => todosStore.setFilters(filters.value);

const usersIdsOptions = computed(() => ['All Users', ...usersIds.value]);
</script>

<template>
  <section class="flex filter shadow-md">
    <div>
      <v-input type="text" v-model="filters.search" @input="search" placeholder="Search..." />
    </div>
    <div>
      <v-select :options="statusesOptions" v-model="filters.byStatus" />
    </div>
    <div>
      <v-select :options="usersIdsOptions" v-model="filters.byUserId" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.filter {
  padding: 20px;
  border-radius: 8px;
  border: 1px solid lightgray;
  background: white;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
