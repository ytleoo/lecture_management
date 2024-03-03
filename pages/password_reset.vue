<script setup lang="ts">
import { navigateTo } from '#app';
import { ref, computed } from 'vue';
import z from 'zod';
import { useApi } from '~/composables/useApi';
import { useApiError } from '~/composables/useApiError';
import { useValidation } from '~/composables/useValidation';

const errorMessage = ref<string | undefined>(undefined);
const password = ref('');
const passwordConfirm = ref('');
const isDisabled = computed(() => !password.value || !passwordConfirm.value);

const { validateForm, validationRules } = useValidation();
const validationPassword = (password: string, passwordConfirm: string) => {
  const formParser = z
    .object({
      password: validationRules.password,
      passwordConfirm: validationRules.passwordConfirm,
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (password !== passwordConfirm) {
        ctx.addIssue({
          path: ['newPasswordConfirm'],
          code: 'custom',
          message: 'パスワードが一致しません',
        });
      }
    });
  errorMessage.value = validateForm(formParser, { password, passwordConfirm });
};

const resetPassword = async (password: string, passwordConfirm: string) => {
  errorMessage.value = '';
  validationPassword(password, passwordConfirm);
  if (errorMessage.value) return;

  const { error } = await useApi('api/v1/auth/password', {
    httpMethod: 'PUT',
    params: { password: password, password_confirmation: passwordConfirm },
  });
  if (error.value) {
    const errors = useApiError(error);
    errorMessage.value = errors?.full_messages?.[0] ?? '登録失敗';
    return;
  }

  await navigateTo('/');
};
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white">
      <h1 class="text-xl font-bold">パスワード変更</h1>
      <CommonFlashMessage type="error" :isVisible="!!errorMessage">{{
        errorMessage
      }}</CommonFlashMessage>
      <form @submit.prevent="resetPassword(password, passwordConfirm)" class="mt-4">
        <CommonFormInput
          type="text"
          id="password"
          placeholder="password"
          label="新しいパスワード"
          v-model:modelValue="password"
        />
        <CommonFormInput
          type="text"
          id="passwordConfirm"
          placeholder="password"
          label="パスワード再入力"
          v-model:modelValue="passwordConfirm"
        />
        <CommonFormButton :is-disabled="isDisabled">変更</CommonFormButton>
      </form>
    </div>
  </div>
</template>
