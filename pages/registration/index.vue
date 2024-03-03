<script setup lang="ts">
import { useHead } from '#imports';
import { useApi } from '~/composables/useApi';

useHead({
  title: '講義登録',
});

const { data: lectures } = await useApi('/api/v1/public/lectures');
const { data: registrations, refresh: refreshRegistrations } =
  await useApi('/api/v1/registrations');
</script>
<template>
  <div class="page-wrapper">
    <div class="flex flex-col justify-around gap-8 md:flex-row">
      <div>
        <section class="h-80">
          <common-section-title>前期</common-section-title>
          <registration-list
            :registrations="registrations.first_term"
            @update-registration="refreshRegistrations()"
          />
        </section>
        <lecture-list
          :lectures="lectures.first_term"
          @update-registration="refreshRegistrations()"
        />
      </div>
      <div>
        <section class="h-80">
          <common-section-title>後期</common-section-title>
          <registration-list
            :registrations="registrations.second_term"
            @update-registration="refreshRegistrations()"
          />
        </section>
        <lecture-list
          :lectures="lectures.second_term"
          @update-registration="refreshRegistrations()"
        />
      </div>
    </div>
  </div>
</template>
