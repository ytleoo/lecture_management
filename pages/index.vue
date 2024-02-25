<script setup lang="ts">
import { navigateTo } from '#app';

const handleLogin = async() =>{
  await navigateTo('/login');
}
</script>
<template>
  <div class="page-wrapper">
    <div class="wrapper-white flex flex-col items-center gap-2">
      <button
        class="button-white w-28"
        @click="handleLogin"
      >
        ログイン
      </button>
      <button
        class="text-gray-400 underline text-sm"
      >
        ユーザー登録
      </button>
    </div>
  </div>
</template>
