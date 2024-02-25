<script setup lang="ts">
import { defineProps } from 'vue';
import { clearError } from '#imports';

type Error = {
  url: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  description: string;
  data: any;
};
interface Props {
  error: Error;
}
defineProps<Props>();

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
      <p class="text-gray-400">エラーが発生しました</p>
      <button
        @click="handleError"
        class="button-white"
      >
        ホームに戻る
      </button>
    </div>
  </main>
</template>
