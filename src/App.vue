<template>
  <TheHeader v-if="route.name !== 'practiceWords'" />
  <RouterView />
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
  console.log('loaded App.vue');
  languageStore.$patch({
    data: JSON.parse(localStorage.getItem('data')),
  });
}
</script>