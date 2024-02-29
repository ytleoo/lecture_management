<script setup lang="ts">
import { ref } from 'vue';
import z from 'zod';
import { useApi } from '~/composables/useApi';
import { useApiError } from '~/composables/useApiError';
import { useValidation } from '~/composables/useValidation';


const errorMessage = ref<string | undefined>(undefined);
const password = ref('');
const passwordConfirm = ref('');

const { validateForm } = useValidation();
const validationPassword = (password: string, passwordConfirm: string) => {
  const formParser = z
    .object({
      password: z
        .string()
        .min(6, { message: 'パスワードを6文字以上で入力してください' })
        .regex(/^[a-zA-Z0-9]+$/, { message: 'パスワードは半角英数字で入力してください' }),
      passwordConfirm: z
        .string()
        .min(6, { message: '確認用パスワードを6文字以上で入力してください' })
        .regex(/^[a-zA-Z0-9]+$/, { message: '確認用パスワードは半角英数字で入力してください' }),
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
    const errors = useApiError(error)
    errorMessage.value = errors?.full_messages?.[0] ?? '登録失敗';
    return;
  }

  alert('変更しました')
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
        <CommonFormInput type="text" id="password" placeholder="password" label="新しいパスワード" v-model:modelValue="password" />
        <CommonFormInput type="text" id="passwordConfirm" placeholder="password" label="パスワード再入力" v-model:modelValue="passwordConfirm" />
        <button type="submit" class="button-base w-28 bg-cyan-500 text-white hover:bg-cyan-400">
          変更
        </button>
      </form>
    </div>
  </div>
</template>
