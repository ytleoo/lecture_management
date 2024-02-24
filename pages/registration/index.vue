<script setup lang="ts">
import { useApi } from '~/composables/useApi';

const { data: lectures } = await useApi('/v1/public/lectures');
</script>
<template>
  <div class="flex w-full flex-col gap-2 items-center pt-16">
    <div class="flex justify-around gap-8">
      <section class="h-52">
      </section>
      <section class="h-52">
      </section>
    </div>
    <section class="flex justify-around gap-8">
      <lecture-list :lectures="lectures" />
      <lecture-list :lectures="lectures" />
    </section>
  </div>
</template>
