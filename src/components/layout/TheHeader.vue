<template>
  <header class="flex justify-between border-b">
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