<script setup lang="ts">
import { useHead } from '#imports';
import { useApi } from '~/composables/useApi';

useHead({
  title: '講義登録',
});

const { data: lectures } = await useApi('/v1/public/lectures');
</script>
<template>
  <div class="flex w-full flex-col gap-2 items-center pt-16">
    <div class="flex justify-around gap-8">
      <section class="h-52">
        <common-section-title>前期</common-section-title>
      </section>
      <section class="h-52">
        <common-section-title>後期</common-section-title>
      </section>
    </div>
    <section class="flex justify-around gap-8">
      <lecture-list :lectures="lectures" />
      <lecture-list :lectures="lectures" />
    </section>
  </div>
</template>
