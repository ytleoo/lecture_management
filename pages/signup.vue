<script setup lang="ts">
import { useAuth, definePageMeta } from '#imports';
import { ref, computed } from 'vue';
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
const isDisabled = computed(() => !password.value || !passwordConfirm.value || !email.value);

const { validateForm, validationRules } = useValidation();
const validationSignUp = (email: string, password: string, passwordConfirm: string) => {
  const formParser = z
    .object({
      email: validationRules.email,
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
        <CommonFormButton :is-disabled="isDisabled">登録</CommonFormButton>
      </form>
    </div>
  </div>
</template>
