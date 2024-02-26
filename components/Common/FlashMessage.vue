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
      class="my-2 rounded-sm border flex items-center justify-center"
      :class="{ 'border-red-200 bg-red-100 py-3 text-red-600': props.type === 'error' }"
    >
      <ExclamationCircleIcon v-if="props.type === 'error'" class="mr-1 h-5 w-5" aria-hidden="true" /><slot />
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