<script setup lang="ts">
import { defineProps } from 'vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

interface Props {
  type: 'error';
  isVisible: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <Transition>
    <p
      v-if="props.isVisible"
      class="my-2 flex items-start justify-center gap-1 rounded-sm border p-1"
      :class="{ 'border-red-200 bg-red-100 py-3 text-red-600': props.type === 'error' }"
    >
      <ExclamationCircleIcon
        v-if="props.type === 'error'"
        class="mt-[2px] h-5 w-5 shrink-0"
        aria-hidden="true"
      /><slot />
    </p>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
