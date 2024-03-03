<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
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

const addLecture = async (lectureId: number) => {
  const { error, data } = await useApi('api/v1/registrations/', {
    httpMethod: 'POST',
    params: { lecture_id: lectureId },
  });
  if (data.value) {
    emits('updateRegistration');
  } else {
    console.log(useApiError(error));
  }
};
</script>
<template>
  <div class="w-full">
    <common-section-title>登録可能な講義</common-section-title>
    <ul class="my-4 h-72 overflow-scroll drop-shadow">
      <lecture v-for="lecture in props.lectures"
        :key="lecture.id" :lecture="lecture">
        <button class="button-base m-0 bg-cyan-500 hover:bg-cyan-400 text-white" @click="addLecture(lecture.id)">登録</button>
      </lecture>
    </ul>
  </div>
</template>
