<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import type { Lecture } from '~/models/lecture.model';
import { useApi } from '~/composables/useApi';

interface Props {
  lecture: Lecture;
}
const props = defineProps<Props>();

const fetchLecture = async (lecture: Lecture) => {
  if (lecture.description) return;
  const { data: lectureData } = await useApi(`/api/v1/public/lectures/${lecture.id}`);
  lecture.description = lectureData.value?.description;
};
</script>
<template>
  <Disclosure
    as="li"
    v-slot="{ open }"
    class="w-full cursor-pointer overflow-hidden border-b bg-white px-3 py-2"
  >
    <DisclosureButton
      class="flex w-full items-center justify-between"
      @click="fetchLecture(props.lecture)"
    >
      <div class="flex">
        <ChevronRightIcon class="h-5 w-5" :class="open && 'rotate-90 transform'" />{{
          props.lecture.name
        }}
      </div>
      <slot />
    </DisclosureButton>
    <DisclosurePanel class="mt-2 w-52 text-wrap border-t pt-2 text-sm text-gray-500"
      >詳細：{{ props.lecture.description }}</DisclosurePanel
    >
  </Disclosure>
</template>
