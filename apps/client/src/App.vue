<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/scss/main.scss';

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
