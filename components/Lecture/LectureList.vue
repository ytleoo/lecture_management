<script setup lang="ts">
import { ref } from 'vue';
import type { Lecture } from '~/models/lecture.model';
import { useApi } from '~/composables/useApi';
import { useApiError } from '~/composables/useApiError';

interface Props {
  lectures: Lecture[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  updateRegistration: [];
}>();

const errorMessage = ref<string | null>(null);

const addLecture = async (lectureId: number) => {
  const { error, data } = await useApi('api/v1/registrations/', {
    httpMethod: 'POST',
    params: { lecture_id: lectureId },
  });
  if (data.value) {
    emits('updateRegistration');
  } else {
    const errors = useApiError(error);
    errorMessage.value = errors?.[0];
  }
};

const clearError = () => (errorMessage.value = null);
</script>
<template>
  <div class="w-full">
    <common-dialog :message="errorMessage" @close-modal="clearError()" />
    <common-section-title>登録可能な講義</common-section-title>
    <ul class="my-4 h-72 w-60 overflow-scroll drop-shadow">
      <lecture v-for="lecture in props.lectures" :key="lecture.id" :lecture="lecture">
        <button
          class="button-base m-0 bg-cyan-500 text-white hover:bg-cyan-400"
          @click.stop="addLecture(lecture.id)"
        >
          登録
        </button>
      </lecture>
    </ul>
  </div>
</template>
