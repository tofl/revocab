<template>
  <BaseContainer class="mt-5">
    <div
      v-if="languagesStore.data[language.toLowerCase()]"
      class="flex flex-col md:flex-row justify-around items-center md:items-start"
    >
      <div class="mb-8 md:sticky md:top-5 bg-main-blue p-10">
        <h1 class="text-8xl mb-4 text-main-dark text-center">{{ language }}</h1>

        <div class="flex justify-around mb-4 md:flex-col md:items-center">
          <p>
            <BaseButton
              @click="startPractice"
              type="outline"
              :disabled="languagesStore.wordsFromCategory(language.toLowerCase(), selectedCategory).length === 0"
              class="mb-5"
            >
              Practice
            </BaseButton>
          </p>

          <form>
            <select v-model="selectedCategory">
              <option
                v-for="category in languagesStore.allCategories(language.toLowerCase())"
                :key="category"
                :value="category"
              >
                {{ displayedWordCategoryName(category) }}
              </option>
            </select>
          </form>
        </div>

        <div class="flex md:flex-col md:items-center">
          <p
            @click="showNewWordDialog = true"
            class="text-lg mr-3 md:mr-0 md:text-2xl cursor-pointer md:mb-5"
          >
            New word
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
                    v-for="category in languagesStore.allCategories(language.toLowerCase())"
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
                    :placeholder="`Word in ${language.toLowerCase()}`"
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

          <p
            @click="showNewCategoryDialog = true"
            class="text-lg mr-3 md:mr-0 md:text-2xl cursor-pointer md:mb-5"
          >
            New category
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

          <p
            v-if="languagesStore.categoryCount(language.toLowerCase()) > 0"
            @click="showDeleteCategoryDialog = true"
            class="text-lg md:text-2xl cursor-pointer md:mb-5 mr-3 md:mr-0"
          >
            Delete category
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

          <p
            @click="showDeleteLanguageDialog = true"
            class="text-lg mr-3 md:mr-0 md:text-2xl cursor-pointer md:mb-5"
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

      <div>
        <WordList
          :language="language.toLowerCase()"
          :word-category="selectedCategory"
        />
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguagesStore } from '@/stores/languages';
import { useRoute, useRouter } from 'vue-router';
import WordList from '@/components/words/WordList.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTextInput from '@/components/ui/BaseTextInput.vue';

const router = useRouter();
const route = useRoute();

const languagesStore = useLanguagesStore();

const language = computed(() => route.params.language.charAt(0).toUpperCase() + route.params.language.slice(1, route.params.language.length));

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
  languagesStore.addWord(language.value.toLowerCase(), newWordCategory.value, newWord.value, translation.value);
  showNewWordDialog.value = false;
  newWord.value = '';
  translation.value = '';
  newWordCategory.value = 'all';
}

// Delete category
const categoriesAvailableToDelete = computed(() => languagesStore.allCategories(language.value.toLowerCase()).filter((c) => c !== 'all'));
const showDeleteCategoryDialog = ref(false);
const categoryToDelete = ref(categoriesAvailableToDelete.value[0]);
const deleteAllWordsFromCategory = ref(false);
function deleteCategory() {
  languagesStore.deleteCategory(language.value.toLowerCase(), categoryToDelete.value.toLowerCase(), deleteAllWordsFromCategory.value);
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

  languagesStore.addCategory(language.value.toLowerCase(), newCategory.value.toLowerCase());
  showNewCategoryDialog.value = false;
  categoryToDelete.value = newCategory.value.toLowerCase();
  newCategory.value = '';
}

// Delete language
const showDeleteLanguageDialog = ref(false);
function deleteLanguage() {
  languagesStore.deleteLanguage(language.value.toLowerCase());
  showDeleteLanguageDialog.value = false;
  router.push('/');
}
</script>
