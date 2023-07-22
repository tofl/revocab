<template>
  <BaseContainer class="mt-12">
    <!-- List of languages -->
    <div
      v-if="languagesStore.languageCount > 0"
      class="flex justify-around flex-col md:flex-row flex-wrap mb-10"
    >
      <div
        class="flex flex-col justify-around md:w-72 lg:w-96 xl:w-128 h-36 mx-5 mb-8 px-4 py-6 cursor-pointer bg-main-blue hover:-translate-y-1 transition-transform ease-in-out"
        v-for="language in languagesStore.allLanguages(true)"
        :key="language"
        @click="pickLanguage(language)"
      >
        <p class="text-4xl font-bold mb-2">{{ language }}</p>
        <p class="text-xl">{{ categoryCount(language.toLowerCase()) }} • {{ wordCount(language.toLowerCase()) }}</p>
      </div>
    </div>
    <div v-else>
      <p>There's nothing here...</p>
    </div>

    <!-- New language form -->
    <form
      class="text-center"
      @submit.prevent="submitLanguage"
    >
      <p
        @click="showNewLanguageForm = true"
        v-if="!showNewLanguageForm"
        class="text-xl cursor-pointer"
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
import BaseContainer from '@/components/ui/BaseContainer.vue';

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
