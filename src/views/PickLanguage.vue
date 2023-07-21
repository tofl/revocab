<template>
  <BaseContainer class="mt-5">
    <!-- List of languages -->
    <div
      v-if="languagesStore.languageCount > 0"
      class="flex justify-around flex-wrap mb-10"
    >
      <div
        class="border w-96 mb-8 px-4 cursor-pointer"
        v-for="language in languagesStore.allLanguages(true)"
        :key="language"
        @click="pickLanguage(language)"
      >
        <p class="text-xl mb-2">{{ language }}</p>
        <p>{{ categoryCount(language.toLowerCase()) }} • {{ wordCount(language.toLowerCase()) }}</p>
      </div>
    </div>
    <div v-else>
      <p>You don't have any language</p>
    </div>

    <!-- New language form -->
    <form
      class="text-center"
      @submit.prevent="submitLanguage"
    >
      <p
        @click="showNewLanguageForm = true"
        v-if="!showNewLanguageForm"
      >
        Add a new language
      </p>
      <div v-else>
        <input
          v-model="languageName"
          type="text"
          placeholder="Type in the name of the language"
          class="border"
          autofocus
        />
        <button>Add</button>
      </div>
    </form>
  </BaseContainer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useLanguagesStore } from '@/stores/languages';
import BaseContainer from '@/components/layout/BaseContainer.vue';

const languagesStore = useLanguagesStore();

const showNewLanguageForm = ref(false);
const languageName = ref('');

const router = useRouter();

function pickLanguage(language) {
  router.push(`/${language.toLowerCase()}`);
}

function submitLanguage() {
  if (languageName.value.trim() === '') {
    return;
  }

  languagesStore.addLanguage(languageName.value.trim().toLowerCase());
  router.push(`/${languageName.value}`);
}

const categoryCount = computed(() => {
  return (language) => {
    const count = languagesStore.categoryCount(language);
    if (count > 1) {
      return `${count} categories`;
    }
    return `${count} category`;
  };
});

const wordCount = computed(() => {
  return (language) => {
    const count = languagesStore.wordCount(language);
    if (count > 1) {
      return `${count} words`;
    }
    return `${count} word`;
  }
});
</script>
