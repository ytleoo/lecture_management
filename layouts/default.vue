<template>
  <header
    class="fixed z-10 flex h-12 w-full items-center justify-between border-b-4 border-cyan-500 bg-cyan-950 px-2"
  >
    <h1 class="text-xl font-bold text-white">講義管理システム</h1>
    <CommonHeaderMenu />
  </header>
  <main class="bg-slate-200">
    <slot />
  </main>
</template>
