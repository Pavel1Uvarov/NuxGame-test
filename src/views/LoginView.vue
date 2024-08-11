<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <main>
    <header></header>
    <section class="content">
      <login-form />
    </section>
    <footer></footer>
  </main>
</template>

<style lang="scss" scoped>
header {
  min-height: 80px;
}

footer {
  min-height: 270px;
  flex: 0;
}

main {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #545454;

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

footer,
header {
  background: #474747;
}
</style>
