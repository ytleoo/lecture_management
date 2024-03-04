import type { mergeProps } from 'vue';
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Registration } from '~registration.model';
import { useApi } from '~/composables/useApi';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { Cog8ToothIcon } from "@heroicons/vue/20/solid";

interface Props {
  registrations: Registration[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  updateRegistration: [];
}>();

const deleteRegistration = async (registrationId: number) => {
  const { error } = await useApi(`/api/v1/registrations/${registrationId}`, {
    httpMethod: 'DELETE',
  });
  if (!error.value) {
    emits('updateRegistration');
  }
};

const changeRegistration = async (registrationId: number) => {
  // 変更
  console.log(registrationId);
};
</script>
<template>
  <div class="w-full">
    <common-section-title>登録した講義</common-section-title>
    <ul class="my-4 h-60 w-60 overflow-scroll drop-shadow">
      <lecture
        v-for="registration in props.registrations"
        :key="registration.id"
        :lecture="{ id: registration.lecture_id, name: registration.name }"
      >
        <div class="flex gap-1">
          <button class="rounded border px-2 py-1 text-gray-400 m-0 text-sm" @click.stop="changeRegistration(registration.id)">
            変更
          </button>
          <button class="m-0" @click.stop="deleteRegistration(registration.id)">
            <XMarkIcon class="h-6 w-6 text-gray-400" />
          </button>
        </div>
      </lecture>
    </ul>
  </div>
</template>
