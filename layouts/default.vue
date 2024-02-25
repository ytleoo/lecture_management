<script setup lang="ts">
import { useAuth } from '#imports';

const { status } = useAuth();
</script>
<template>
  <header
    class="fixed z-10 flex h-12 w-full items-center justify-between border-b-4 border-cyan-500 bg-cyan-950 px-2"
  >
    <h1 class="font-bold text-white md:text-xl">講義管理システム</h1>
    <CommonHeaderMenu v-show="status === 'authenticated'" />
  </header>
  <main class="h-hull min-h-screen w-full bg-slate-200">
    <slot />
  </main>
</template>
