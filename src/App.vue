<template>
  <div class="bg-main-green min-h-screen text-main-dark">
    <TheHeader v-if="route.name !== 'practiceWords'" />
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute, RouterView } from 'vue-router';
import { useLanguagesStore } from '@/stores/languages';
import TheHeader from '@/components/layout/TheHeader.vue';

const route = useRoute();
const languageStore = useLanguagesStore();

if (!localStorage.getItem('data')) {
  localStorage.setItem('data', JSON.stringify({}));
} else {
  languageStore.$patch({
    data: JSON.parse(localStorage.getItem('data')),
  });
}
</script>