<script setup lang="ts">
import { navigateTo } from '#app';
import { onMounted } from 'vue';

onMounted(async () => {
  await navigateTo('/registration');
});
</script>
<template>
  <div></div>
</template>
