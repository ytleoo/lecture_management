<script setup lang="ts">
interface Props {
  isDisabled: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <button
    type="submit"
    :disabled="props.isDisabled"
    class="button-base w-28 text-white"
    :class="[props.isDisabled ? 'bg-slate-300' : 'bg-cyan-500 hover:bg-cyan-400']"
  >
    <slot />
  </button>
</template>
