<script setup lang="ts">
import { ref } from 'vue';
import type { Registration } from '~registration.model';
import type { Lecture } from '~/models/lecture.model';
import { useApi } from '~/composables/useApi';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useApiError } from '~/composables/useApiError';

interface Props {
  selectedRegistration: Registration | null;
  selectableLectures: Lecture[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  closeModal: [];
  updateRegistration: [];
}>();

const closeModal = () => {
  emits('closeModal');
};

const errorMessage = ref<string | null>(null);
const changeRegistration = async (lectureId: number) => {
  console.log(props.selectedRegistration)
  const { error } = await useApi(`/api/v1/registrations/${props.selectedRegistration.id}`, {
    httpMethod: 'PATCH',
    params: {"lecture_id": lectureId}
  });
  if (!error.value) {
    closeModal();
    emits('updateRegistration');
  } else {
    const errors = useApiError(error);
    errorMessage.value = errors?.[0];
  }
};

const clearError = () => (errorMessage.value = null);
</script>
<template>
  <common-dialog :message="errorMessage" @close-modal="clearError()" />
  <TransitionRoot appear :show="!!props.selectedRegistration?.name" as="template">
    <Dialog as="div" @click="closeModal" class="relative z-20">
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
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 mb-4"
              >
              {{ props.selectedRegistration?.name }}を変更
              </DialogTitle>
              <div class="mt-2 flex flex-col items-center">
                <p class="text-gray-400 mb-3">リストから選択してください</p>
                <ul class="h-72 w-11/12 overflow-scroll">
                  <lecture
                    v-for="lecture in props.selectableLectures"
                    :key="lecture.id"
                    :lecture="lecture"
                  >
                    <div class="flex gap-1">
                      <button
                        class="m-0 rounded border px-2 py-1 text-sm text-gray-400"
                        @click.stop="changeRegistration(lecture.id)"
                      >
                        変更
                      </button>
                    </div>
                  </lecture>
                </ul>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
