<template>
  {{ props }}
</template>

<script setup>
const props = defineProps({
  language: {
    type: String,
    required: true,
  },
  wordCategory: {
    type: String,
    required: true,
  },
});
</script>