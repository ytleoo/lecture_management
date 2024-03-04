<script setup lang="ts">
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';

interface Props {
  message: string | null;
}
const props = defineProps<Props>();

const emits = defineEmits<{
  closeModal: [];
}>();

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
  emits('closeModal');
};
// const openModal = () => {
//   isOpen.value = true;
// };
</script>
<template>
  <TransitionRoot appear :show="!!props.message" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 align-middle shadow-xl transition-all"
            >
              <div class="mt-2">
                <p class="text-base text-gray-500">
                  {{ props.message }}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="button-base m-0 bg-cyan-500 px-6 text-white hover:bg-cyan-400"
                  @click="closeModal"
                >
                  OK
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
