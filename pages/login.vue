<script setup lang="ts">
import { useAuth, definePageMeta } from '#imports';
import { ref } from 'vue';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/registration',
  },
});

const { signIn } = useAuth();

const handleSignIn = async(email: string, password: string) => {
  // TODO: バリデーション
  const { error } = await useApi('api/v1/auth/sign_in', {httpMethod: 'POST', params: {email: email, password: password}});
  // TODO: エラーハンドリング
  console.log(error.value?.data)
  console.log(error.value?.statusCode)
  if (error.value) return;
  signIn({ email, password }, { external: true, callbackUrl: '/registration' })
}

const email = ref('');
const password = ref('');
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white">
      <h1 class="text-xl font-bold">ログイン</h1>
      <form
        @submit.prevent="handleSignIn(email, password)"
        class="mt-4"
      >
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
