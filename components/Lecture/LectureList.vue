<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
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

const fetchLecture = async (lecture: Lecture) => {
  if (lecture.description) return;
  const { data: lectureData } = await useApi(`/api/v1/public/lectures/${lecture.id}`);
  lecture.description = lectureData.value.description;
};

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
      <Disclosure
        as="li"
        v-slot="{ open }"
        v-for="lecture in props.lectures"
        :key="lecture.id"
        class="w-full cursor-pointer overflow-hidden border-b bg-white px-4 py-2"
      >
        <DisclosureButton
          class="flex w-full items-center justify-between"
          @click="fetchLecture(lecture)"
        >
          <div class="flex">
            <ChevronRightIcon class="h-5 w-5" :class="open && 'rotate-90 transform'" />{{
              lecture.name
            }}
          </div>
          <button class="button-base m-0 bg-cyan-500 hover:bg-cyan-400 text-white" @click="addLecture(lecture.id)">登録</button>
        </DisclosureButton>
        <DisclosurePanel class="mt-2 w-52 text-wrap border-t pt-2 text-sm text-gray-500"
          >詳細：{{ lecture.description }}</DisclosurePanel
        >
      </Disclosure>
    </ul>
  </div>
</template>
