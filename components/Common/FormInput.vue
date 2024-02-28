<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  type: string;
  id: string;
  placeholder: string;
  label: string
  modelValue: string | null;
}
const props = defineProps<Props>();

const emits = defineEmits<{
  'update:modelValue': [modelValue: string| null];
}>();
</script>
<template>
  <div class="my-4 flex w-full flex-col items-center">
    <label :for="props.id" class="w-full px-4 text-left text-gray-500 md:w-5/6">{{props.label}}</label>
    <input
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :id="props.id"
      @input="emits('update:modelValue', $event.target.value)"
      required
      class="w-full border-b px-4 py-2 focus:border-b-2 focus:border-cyan-500 focus:outline-none md:w-5/6"
    />
  </div>
</template>