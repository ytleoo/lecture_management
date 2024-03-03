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

const errorMessage = ref<string | undefined>(undefined);
const email = ref('');
const password = ref('');

const { validateForm } = useValidation();
const validationLogin = (email: string, password: string) => {
  const formParser = z.object({
    email: z.string().email({ message: 'メールアドレスが不正です' }),
    password: z
      .string()
      .min(6, { message: 'パスワードを6文字以上で入力してください' })
      .regex(/^[a-zA-Z0-9]+$/, { message: 'パスワードは半角英数字で入力してください' }),
  });
  errorMessage.value = validateForm(formParser, { email, password });
};

const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  errorMessage.value = '';
  validationLogin(email, password);
  if (errorMessage.value) return;

  const { error, authHeaders } = await usePostAuth('api/v1/auth/sign_in', {
    params: { email: email, password: password },
  });

  if (error.value) {
    const errors = useApiError(error);
    errorMessage.value = errors?.[0] ?? 'ログイン失敗';
    return;
  }

  signIn({ authHeaders }, { external: true, callbackUrl: '/registration' });
};
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white">
      <h1 class="text-xl font-bold">ログイン</h1>
      <CommonFlashMessage type="error" :isVisible="!!errorMessage">{{
        errorMessage
      }}</CommonFlashMessage>
      <form @submit.prevent="handleSignIn(email, password)" class="mt-4">
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
        <button type="submit" class="button-base w-28 bg-cyan-500 text-white hover:bg-cyan-400">
          ログイン
        </button>
      </form>
      <button class="mt-3 text-sm text-gray-400 underline" @click="navigateTo('/signup')">
        ユーザー新規登録
      </button>
    </div>
  </div>
</template>
