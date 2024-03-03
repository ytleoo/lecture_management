<script setup lang="ts">
import { useAuth, definePageMeta } from '#imports';
import { ref } from 'vue';
import z from 'zod';
import { usePostAuth } from '~/composables/usePostAuth';
import { useApiError } from '~/composables/useApiError';
import { useValidation } from '~/composables/useValidation';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/registration',
  },
});

const { signIn } = useAuth();

const errorMessage = ref<string | undefined>(undefined);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const { validateForm } = useValidation();
const validationSignUp = (email: string, password: string, passwordConfirm: string) => {
  const formParser = z
    .object({
      email: z.string().email({ message: 'メールアドレスが不正です' }),
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
  errorMessage.value = validateForm(formParser, { email, password, passwordConfirm });
};

const signUp = async (email: string, password: string, passwordConfirm: string) => {
  errorMessage.value = '';
  validationSignUp(email, password, passwordConfirm);
  if (errorMessage.value) return;

  const { error, authHeaders } = await usePostAuth('api/v1/auth', {
    params: { email: email, password: password },
  });
  if (error.value) {
    const errors = useApiError(error);
    errorMessage.value = errors?.full_messages?.[0] ?? '登録失敗';
    return;
  }
  signIn({ authHeaders }, { external: true, callbackUrl: '/registration' });
};
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white">
      <h1 class="text-xl font-bold">ユーザー登録</h1>
      <CommonFlashMessage type="error" :isVisible="!!errorMessage">{{
        errorMessage
      }}</CommonFlashMessage>
      <form @submit.prevent="signUp(email, password, passwordConfirm)" class="mt-4">
        <CommonFormInput
          type="text"
          id="email"
          placeholder="email@email"
          label="メールアドレス"
          v-model:modelValue="email"
        />
        <CommonFormInput
          type="text"
          id="password"
          placeholder="password"
          label="パスワード"
          v-model:modelValue="password"
        />
        <CommonFormInput
          type="text"
          id="passwordConfirm"
          placeholder="password"
          label="パスワード再入力"
          v-model:modelValue="passwordConfirm"
        />
        <button type="submit" class="button-base w-28 bg-cyan-500 text-white hover:bg-cyan-400">
          登録
        </button>
      </form>
    </div>
  </div>
</template>
