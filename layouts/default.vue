<script setup lang="ts">
</script>
<template>
  <header class="h-12 bg-cyan-950 flex justify-between items-center px-2 border-b-4 border-cyan-500 fixed w-full">
    <h1 class="font-bold text-xl text-white">講義管理システム</h1>
    <CommonHeaderMenu />
  </header>
  <main class="bg-slate-200 h-screen">
    <slot />
  </main>
</template>
