import type { mergeProps } from 'vue';
<script setup lang="ts">
import { ref } from 'vue';
import type { Registration } from '~registration.model';
import { useApi } from '~/composables/useApi';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useApiError } from '~/composables/useApiError';

interface Props {
  registrations: Registration[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  updateRegistration: [];
}>();

const errorMessage = ref<string | null>(null);

const deleteRegistration = async (registrationId: number) => {
  const { error } = await useApi(`/api/v1/registrations/${registrationId}`, {
    httpMethod: 'DELETE',
  });
  if (!error.value) {
    emits('updateRegistration');
  } else {
    const errors = useApiError(error);
    errorMessage.value = errors?.[0];
  }
};

const changeRegistration = async (registrationId: number) => {
  // 変更
  console.log(registrationId);
};

const clearError = () => (errorMessage.value = null);
</script>
<template>
  <div class="w-full">
    <common-dialog :message="errorMessage" @close-modal="clearError()" />
    <common-section-title>登録した講義</common-section-title>
    <ul class="my-4 h-60 w-60 overflow-scroll drop-shadow">
      <lecture
        v-for="registration in props.registrations"
        :key="registration.id"
        :lecture="{ id: registration.lecture_id, name: registration.name }"
      >
        <div class="flex gap-1">
          <button
            class="m-0 rounded border px-2 py-1 text-sm text-gray-400"
            @click.stop="changeRegistration(registration.id)"
          >
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
