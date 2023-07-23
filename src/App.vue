<template>
  <div class="bg-main-green min-h-screen text-main-dark">
    <transition
      leave-active-class="transition-opacity duration-200 ease-in-out"
      enter-active-class="transition-opacity duration-200 ease-in-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <TheHeader v-if="route.name !== 'practiceWords'" />
    </transition>

    <RouterView v-slot="{ Component }">
      <transition
        mode="out-in"
        leave-active-class="transition-opacity duration-200 ease-in-out"
        enter-active-class="transition-opacity duration-200 ease-in-out"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <component :is="Component" />
      </transition>
    </RouterView>
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