<script setup lang="ts">
import { useHead } from '#imports';
import { useApi } from '~/composables/useApi';

useHead({
  title: '講義登録',
});

const { data: lectures } = await useApi('/api/v1/public/lectures');
const {
  data: registrations,
  refresh: refreshRegistrations,
  error,
} = await useApi('/api/v1/registrations');
if (error.value) {
  throw showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    message: error.value.data.errors,
  });
}
</script>
<template>
  <div class="page-wrapper">
    <div class="flex flex-col justify-around gap-8 md:flex-row">
      <div>
        <section class="h-84">
          <h2 class="mb-4 text-xl font-bold">前期</h2>
          <registration-list
            :registrations="registrations.first_term"
            :selectable-lectures="lectures.first_term"
            @update-registration="refreshRegistrations()"
          />
        </section>
        <lecture-list
          :lectures="lectures.first_term"
          @update-registration="refreshRegistrations()"
        />
      </div>
      <div>
        <section class="h-84">
          <h2 class="mb-4 text-xl font-bold">後期</h2>
          <registration-list
            :registrations="registrations.second_term"
            :selectable-lectures="lectures.second_term"
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
