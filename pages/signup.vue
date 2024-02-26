<script setup lang="ts">
import { useAuth, definePageMeta } from '#imports';
import { ref } from 'vue';
import z from 'zod';
import { useApi } from '~/composables/useApi';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/registration',
  },
});

const { signIn } = useAuth();

const errorMessage = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const validationSignUp = (email: string, password: string, passwordConfirm: string): boolean => {
  const formParser = z
    .object({
      email: z.string().email({ message: 'メールアドレスが不正です' }),
      password: z.string().min(6, { message: 'パスワードを6文字以上で入力してください' }),
      passwordConfirm: z
        .string()
        .min(6, { message: '確認用パスワードを6文字以上で入力してください' }),
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
  const parsed = formParser.safeParse({ email, password, passwordConfirm });
  if (!parsed.success) {
    const errors = parsed.error.errors.map((error) => error.message);
    errorMessage.value = errors[0];
    return false;
  }
  return true;
};

const signUp = async (email: string, password: string, passwordConfirm: string) => {
  errorMessage.value = '';
  const isValid = validationSignUp(email, password, passwordConfirm);
  if (!isValid) return;

  const { error } = await useApi('api/v1/auth', {
    httpMethod: 'POST',
    params: { email: email, password: password },
  });
  if (error.value) {
    errorMessage.value = error.value?.data.errors[0];
    return;
  }
  signIn({ email, password }, { external: true, callbackUrl: '/registration' });
};
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white">
      <h1 class="text-xl font-bold">ユーザー登録</h1>
      <CommonFlashMessage type="error" :isVisible=!!errorMessage>{{ errorMessage }}</CommonFlashMessage>
      <form @submit.prevent="signUp(email, password, passwordConfirm)" class="mt-4">
        <div class="my-4 flex w-full flex-col items-center">
          <label for="email" class="w-full px-4 text-left text-gray-500 md:w-5/6">email</label>
          <input
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
            v-model="password"
            type="text"
            placeholder="password"
            id="password"
            class="w-full border-b px-4 py-2 focus:border-b-2 focus:border-cyan-500 focus:outline-none md:w-5/6"
          />
        </div>
        <div class="my-4 flex w-full flex-col items-center">
          <label for="password" class="w-full px-4 text-left text-gray-500 md:w-5/6"
            >パスワード再入力</label
          >
          <input
            v-model="passwordConfirm"
            type="text"
            placeholder="password"
            id="passwordConfirm"
            class="w-full border-b px-4 py-2 focus:border-b-2 focus:border-cyan-500 focus:outline-none md:w-5/6"
          />
        </div>
        <button type="submit" class="button-white w-28 bg-cyan-500 text-white hover:bg-cyan-400">
          登録
        </button>
      </form>
    </div>
  </div>
</template>
