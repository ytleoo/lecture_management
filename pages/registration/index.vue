<script setup lang="ts">
import { useHead } from '#imports';
import { useApi } from '~/composables/useApi';

useHead({
  title: '講義登録',
});

const { data: lectures } = await useApi('/v1/public/lectures');
</script>
<template>
  <div class="flex w-full flex-col items-center gap-2 pt-16">
    <div class="flex flex-row justify-around gap-8 sm:flex-col">
      <div>
        <section class="h-52">
          <common-section-title>前期</common-section-title>
        </section>
        <lecture-list :lectures="lectures" />
      </div>
      <div>
        <section class="h-52">
          <common-section-title>後期</common-section-title>
        </section>
        <lecture-list :lectures="lectures" />
      </div>
    </div>
  </div>
</template>
