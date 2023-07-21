<template>
  <div>
    <h1>Pick a language...</h1>

    <main>
      <!-- List of languages -->
      <div>
        <div
          class="border w-96"
          v-for="language in languagesStore.allLanguages"
          :key="language"
          @click="pickLanguage(language)"
        >
          {{ language }}
        </div>
      </div>

      <!-- New language form -->
      <p class="text-center">New language</p>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useLanguagesStore } from '@/stores/languages';

const languagesStore = useLanguagesStore();

const router = useRouter();

function pickLanguage(language) {
  router.push(`/${language}`);
}
</script>
