import type { mergeProps } from 'vue';
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Registration } from  '~registration.model';
import { useApi } from '~/composables/useApi';

interface Props {
  registrations: Registration[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  'updateRegistration': [];
}>();

const deleteRegistration = async (registrationId: number) => {
  const {error} = await useApi(`/api/v1/registrations/${registrationId}`, {httpMethod: 'DELETE'})
  if(!error.value) {
    emits('updateRegistration')
  }
}

const changeRegistration = async (registrationId: number) => {
  // 変更
  console.log(registrationId)
}

</script>
<template>
  <div class="w-full">
    <common-section-title>登録した講義</common-section-title>
    <ul class="my-4 h-72 drop-shadow">
      <li v-for="registration in props.registrations" :key="registration.id" class="border-b bg-white px-4 py-2 flex justify-around items-center">
        {{ registration.name }}
        <div class="flex">
          <button class="button-base m-0" @click="deleteRegistration(registration.id)">削除</button>
          <button class="button-base m-0" @click="changeRegistration(registration.id)">変更</button>
        </div>
      </li>
    </ul>
  </div>
</template>
