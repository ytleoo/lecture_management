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
      <li
        v-for="lecture in props.lectures"
        :key="lecture.id"
        class="flex items-center justify-around border-b bg-white px-4 py-2"
      >
        {{ lecture.name }}
        <div class="flex">
          <button class="button-base m-0" @click="addLecture(lecture.id)">登録</button>
        </div>
      </li>
    </ul>
  </div>
</template>
