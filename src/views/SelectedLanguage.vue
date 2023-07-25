<template>
  <div
    v-if="languagesStore.data[selectedLanguage.toLowerCase()]"
    class="md:flex"
  >
    <!-- Controls -->
    <div class="bg-main-blue p-4 md:w-1/2 md:h-screen md:sticky md:top-0">
      <p class="absolute">
        <RouterLink to="/">Home</RouterLink>
      </p>

      <form>
        <h1 class="text-center text-2xl mb-4 md:text-4xl md:mb-8">
          <select
            class="bg-transparent"
            v-model="selectedCategory"
          >
            <option
              v-for="category in languagesStore.allCategories(selectedLanguage.toLowerCase())"
              :key="category"
              :value="category"
            >
              {{ displayedWordCategoryName(category) }}
            </option>
          </select>
          in {{ selectedLanguage }}
        </h1>
      </form>

      <p class="text-center mb-4 md:mb-8">
        <BaseButton
          type="outline"
          :disabled="languagesStore.wordsFromCategory(selectedLanguage.toLowerCase(), selectedCategory).length === 0"
          @click="startPractice"
        >
          Practice
        </BaseButton>
      </p>

      <div class="flex justify-around text-xl md:block md:text-center md:mb-8">
        <p class="mb-4">
          <span
            class="cursor-pointer"
            @click="showNewWordDialog = true"
          >
            New word
          </span>
        </p>
        <BaseDialog
          :show="showNewWordDialog"
          @close="showNewWordDialog = false"
        >
          <template #title>
            <p class="text-2xl mr-4">Add a new word...</p>
            <div class="flex">
              <select v-model="newWordCategory">
                <option
                  v-for="category in languagesStore.allCategories(selectedLanguage.toLowerCase())"
                  :key="category"
                  :value="category"
                >
                  {{ displayedWordCategoryName(category) }}
                </option>
              </select>
            </div>
          </template>

          <template #default>
            <form @submit.prevent="addWord">
              <div>
                <BaseTextInput
                  v-model.trim="newWord"
                  :placeholder="`Word in ${selectedLanguage.toLowerCase()}`"
                  class="mr-2"
                />
                <BaseTextInput
                  v-model.trim="translation"
                  placeholder="Meaning"
                  class="mr-2"
                />
                <BaseButton type="outline">Add</BaseButton>
              </div>
            </form>
          </template>
        </BaseDialog>

        <p class="mb-4">
          <span
            class="mb-4 cursor-pointer"
            @click="showNewCategoryDialog = true"
          >
            New category
          </span>
        </p>
        <BaseDialog
          :show="showNewCategoryDialog"
          @close="showNewCategoryDialog = false"
        >
          <template #title>
            <p class="text-2xl mb-4">Add a category</p>
          </template>

          <template #default>
            <form @submit.prevent="addCategory">
              <div>
                <BaseTextInput
                  v-model="newCategory"
                  placeholder="Verb, adjective, ..."
                  class="mr-2"
                />
                <BaseButton type="outline">Add</BaseButton>
              </div>
            </form>
          </template>
        </BaseDialog>

        <p class="mb-4">
          <span
            class="cursor-pointer"
            @click="showDeleteCategoryDialog = true"
          >
            Delete category
          </span>
        </p>
        <BaseDialog
          :show="showDeleteCategoryDialog"
          @close="showDeleteCategoryDialog = false"
        >
          <template #title>
            <p class="text-2xl mb-4">Remove a category</p>
          </template>

          <template #default>
            <form @submit.prevent="deleteCategory">
              <div>
                <select
                  v-model="categoryToDelete"
                  class="mr-2 text-xl"
                >
                  <option
                    v-for="category in categoriesAvailableToDelete"
                    :key="category"
                    :value="category"
                  >
                    {{ displayedWordCategoryName(category) }}
                  </option>
                </select>

                <input
                  type="checkbox"
                  id="deleteAllWords"
                  v-model="deleteAllWordsFromCategory"
                />
                <label
                  for="deleteAllWords"
                  class="mr-2 text-xl"
                >
                  Delete associated words
                </label>

                <BaseButton type="outline">Delete</BaseButton>
              </div>
            </form>
          </template>
        </BaseDialog>
      </div>

      <div class="flex justify-around text-xl md:justify-center">
        <p
          class="cursor-pointer md:mr-6"
          @click="saveLanguage"
        >
          Save
        </p>

        <p
          class="cursor-pointer"
          @click="showDeleteLanguageDialog = true"
        >
          Delete language
        </p>
        <BaseDialog
          :show="showDeleteLanguageDialog"
          @close="showDeleteLanguageDialog = false"
        >
          <template #title>
            <p class="text-2xl mb-4">Delete a language</p>
          </template>

          <template #default>
            <p class="text-lg">You are about to delete a language and lose all associated words. Do you want to proceed ?</p>
            <BaseButton @click="deleteLanguage">Proceed</BaseButton>
          </template>
        </BaseDialog>
      </div>
    </div>

    <!-- Word list -->
    <div class="md:w-1/2">
      <WordList
        :word-category="selectedCategory"
        :language="selectedLanguage.toLowerCase()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguagesStore } from '@/stores/languages';
import { useRoute, useRouter } from 'vue-router';
import WordList from '@/components/words/WordList.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTextInput from '@/components/ui/BaseTextInput.vue';

const router = useRouter();
const route = useRoute();

const languagesStore = useLanguagesStore();

const selectedLanguage = computed(() => route.params.language.charAt(0).toUpperCase() + route.params.language.slice(1, route.params.language.length));

// Category selection
const selectedCategory = ref('all');
function displayedWordCategoryName(c) {
  return c.charAt(0).toUpperCase() + c.slice(1, c.length);
}

// Practice button
function startPractice() {
  router.push({ name: 'practiceWords', params: { wordCategory: selectedCategory.value } });
}

// Add word
const showNewWordDialog = ref(false);
const newWord = ref('');
const translation = ref('');
const newWordCategory = ref('all');

function addWord() {
  if (newWord.value.length === 0 || translation.value.length === 0) {
    return;
  }

  // Add to the store and localStorage
  languagesStore.addWord(selectedLanguage.value.toLowerCase(), newWordCategory.value, newWord.value, translation.value);
  showNewWordDialog.value = false;
  newWord.value = '';
  translation.value = '';
  newWordCategory.value = 'all';
}

// Delete category
const categoriesAvailableToDelete = computed(() => languagesStore.allCategories(selectedLanguage.value.toLowerCase()).filter((c) => c !== 'all'));
const showDeleteCategoryDialog = ref(false);
const categoryToDelete = ref(categoriesAvailableToDelete.value[0]);
const deleteAllWordsFromCategory = ref(false);
function deleteCategory() {
  languagesStore.deleteCategory(selectedLanguage.value.toLowerCase(), categoryToDelete.value.toLowerCase(), deleteAllWordsFromCategory.value);
  categoryToDelete.value = categoriesAvailableToDelete.value[0];
  deleteAllWordsFromCategory.value = false;
  showDeleteCategoryDialog.value = false;
}

// Add category
const showNewCategoryDialog = ref(false);
const newCategory = ref('');
function addCategory() {
  if (newCategory.value.length === 0) {
    return;
  }

  languagesStore.addCategory(selectedLanguage.value.toLowerCase(), newCategory.value.toLowerCase());
  showNewCategoryDialog.value = false;
  categoryToDelete.value = newCategory.value.toLowerCase();
  newCategory.value = '';
}

// Delete language
const showDeleteLanguageDialog = ref(false);
function deleteLanguage() {
  languagesStore.deleteLanguage(selectedLanguage.value.toLowerCase());
  showDeleteLanguageDialog.value = false;
  router.push('/');
}

async function saveLanguage() {
  const objectToSave = {
    languageName: selectedLanguage.value,
    content: languagesStore.data[selectedLanguage.value.toLowerCase()],
  };
  const blob = new Blob([JSON.stringify(objectToSave)], { type: 'text/plain' });
  const a = document.createElement('a');
  a.download = `${selectedLanguage.value}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  a.click();
}
</script>
