import type { mergeProps } from 'vue';
<script setup lang="ts">
import { defineProps } from 'vue';
import type { Lecture } from '~/models/lecture.model';

interface Props {
  lectures: Lecture[];
}
const props = defineProps<Props>();
</script>
<template>
  <div class="w-60">
    <common-section-title>登録可能な講義</common-section-title>
    <ul class="my-4 bg-white h-72 overflow-scroll drop-shadow">
      <li v-for="lecture in props.lectures" :key="lecture.id" class="border-b px-4 py-2">
        {{ lecture.name }}
      </li>
    </ul>
  </div>
</template>
