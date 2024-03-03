<script setup lang="ts">
import { clearError, useError } from '#imports';
import { ref } from 'vue';

const error = useError();
const { statusCode, statusMessage, message } = error.value;
const displayMessage = ref<string>(message);
if (statusCode === 404) {
  displayMessage.value = 'ページが見つかりません。';
}

const handleError = () => clearError({ redirect: '/' });
</script>
<template>
  <header
    class="fixed z-10 flex h-12 w-full items-center justify-between border-b-4 border-cyan-500 bg-cyan-950 px-2"
  >
    <h1 class="font-bold text-white md:text-xl">講義管理システム</h1>
    <CommonHeaderMenu />
  </header>
  <main class="h-hull min-h-screen w-full bg-slate-200 pt-20">
    <div class="wrapper-white">
      <h2 class="mb-4 text-xl font-bold text-cyan-950">{{ statusCode }} {{ statusMessage }}</h2>
      <p class="text-gray-400">{{ displayMessage }}</p>
      <button @click="handleError" class="button-base">ホームに戻る</button>
    </div>
  </main>
</template>
