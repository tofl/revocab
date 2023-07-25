<template>
  <BaseContainer class="p-8 md:px-0">
    <h1 class="text-4xl font-bold mb-8">Practice your vocabulary on <span class="italic">Revocab</span></h1>
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
      <p class="text-center text-xl mb-8">There's nothing here...</p>
    </div>

    <!-- New language form -->
    <form
      class="text-center"
      @submit.prevent="submitLanguage"
    >
      <p
        v-if="!showNewLanguageForm"
        class="text-xl cursor-pointer"
      >
        <span @click="showNewLanguageForm = true">
          Add a new language
        </span>
        or <BaseButton @click="showImportDialog = true">Import</BaseButton>
      </p>
      <div v-else>
        <BaseTextInput
          v-model="languageName"
          class="mr-4"
          placeholder="Type in the language"
          autofocus
        />
        <BaseButton>Add</BaseButton>
      </div>

      <!-- Import a new language -->
      <BaseDialog
        :show="showImportDialog"
        @close="showImportDialog = false"
      >
        <template #title>
          <div>
            <p class="text-2xl">Import a file</p>
            <p class="mb-4">You can import your previously saved words using the simple form below.</p>
          </div>
        </template>

        <template #default>
          <form>
            <div class="flex">
              <input
                type="file"
                ref="fileUploader"
                @change="handleFile"
              />
              <p v-if="uploadIsDone">
                Successfully uploaded
              </p>
            </div>
          </form>
        </template>
      </BaseDialog>
    </form>
  </BaseContainer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useLanguagesStore } from '@/stores/languages';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTextInput from '@/components/ui/BaseTextInput.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';

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

const showImportDialog = ref(false);
const uploadIsDone = ref(false);

function handleFile(e) {
  const reader = new FileReader();
  reader.onload = () => {
    const { languageName, content } = JSON.parse(reader.result);
    // console.log(languageName, content);
    const { data } = languagesStore;
    data[languageName.toLowerCase()] = content;
    console.log(data);
    languagesStore.$patch({ data });
    localStorage.setItem('data', JSON.stringify(data));
    uploadIsDone.value = true;
  };

  reader.readAsText(e.target.files[0]);
}
</script>
