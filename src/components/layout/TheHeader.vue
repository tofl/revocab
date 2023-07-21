<template>
  <header class="flex justify-between border-b h-14 items-center px-10">
    <div>
      <RouterLink to="/">Revocab</RouterLink>
    </div>

    <div>
      <button>Import</button>
      <button>Export</button>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>