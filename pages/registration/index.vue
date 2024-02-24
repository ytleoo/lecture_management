<script setup lang="ts">
const { data: lectures } = await useApi('/v1/public/lectures');
</script>
<template>
  <section>
    <ul>
      <li v-for="lecture in lectures" :key="lecture.id">講義名：{{ lecture.name }}</li>
    </ul>
  </section>
</template>
