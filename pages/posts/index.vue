<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch('http://localhost:3000/posts')
</script>
<template>
  <section>
    <TestComponent />
    <ul>
      <li v-for="d in data" :key="d.id">
        {{ d.body }} / {{ d.created_at }}
      </li>
    </ul>
  </section>
</template>
