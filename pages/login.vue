<script setup lang="ts">
import { useAuth, definePageMeta } from '#imports';
import { ref } from 'vue';
import z from 'zod';
import { useApi } from '~/composables/useApi';
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
    password: z.string().min(6, { message: 'パスワードを6文字以上で入力してください' }),
  });
  errorMessage.value = validateForm(formParser, { email, password });
};

const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  errorMessage.value = '';
  validationLogin(email, password);
  if (errorMessage.value) return;

  const { error } = await useApi('api/v1/auth/sign_in', {
    httpMethod: 'POST',
    params: { email: email, password: password },
  });

  if (error.value) {
    useApiError(error)
    errorMessage.value = error.value?.data?.errors[0];
    return;
  }
  signIn({ email, password }, { external: true, callbackUrl: '/registration' });
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
        <div class="my-4 flex w-full flex-col items-center">
          <label for="email" class="w-full px-4 text-left text-gray-500 md:w-5/6">email</label>
          <input
            required
            v-model="email"
            type="text"
            placeholder="email"
            id="email"
            class="w-full border-b px-4 py-2 focus:border-b-2 focus:border-cyan-500 focus:outline-none md:w-5/6"
          />
        </div>
        <div class="my-4 flex w-full flex-col items-center">
          <label for="password" class="w-full px-4 text-left text-gray-500 md:w-5/6"
            >パスワード</label
          >
          <input
            required
            v-model="password"
            type="text"
            placeholder="password"
            id="password"
            class="w-full border-b px-4 py-2 focus:border-b-2 focus:border-cyan-500 focus:outline-none md:w-5/6"
          />
        </div>
        <button type="submit" class="button-white w-28 bg-cyan-500 text-white hover:bg-cyan-400">
          ログイン
        </button>
      </form>
      <button class="mt-3 text-sm text-gray-400 underline" @click="navigateTo('/signup')">
        ユーザー新規登録
      </button>
    </div>
  </div>
</template>
