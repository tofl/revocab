<template>
  <BaseContainer class="mt-5">
    <div class="flex items-center">
      <h1 class="text-5xl mr-2">{{ language }}</h1>

      <button @click="startPractice">Practice</button>

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

    <div class="flex">
      <p
        @click="showNewWordDialog = true"
        class="mr-3 cursor-pointer"
      >
        New word
      </p>
      <BaseDialog
        :show="showNewWordDialog"
        @close="showNewWordDialog = false"
      >
        <form @submit.prevent="addWord">
          <div class="flex mb-4">
            <p class="text-2xl mr-4">Add a new word...</p>
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

          <div>
            <input
              type="text"
              v-model.trim="newWord"
              :placeholder="`Word in ${language.toLowerCase()}`"
            />
            <input
              type="text"
              v-model.trim="translation"
              placeholder="Meaning"
            />
            <button>Add</button>
          </div>
        </form>
      </BaseDialog>

      <p
        @click="showNewCategoryDialog = true"
        class="mr-3 cursor-pointer"
      >
        New category
      </p>
      <BaseDialog
        :show="showNewCategoryDialog"
        @close="showNewCategoryDialog = false"
      >
        <form @submit.prevent="addCategory">
          <p class="text-2xl mb-4">Add a category</p>

          <div>
            <input
              type="text"
              v-model="newCategory"
              placeholder="Verb, adjective, ..."
            />
            <button>Add</button>
          </div>
        </form>
      </BaseDialog>

      <p
        v-if="languagesStore.categoryCount(language.toLowerCase()) > 0"
        @click="showDeleteCategoryDialog = true"
        class="mr-3 cursor-pointer"
      >
        Delete category
      </p>
      <BaseDialog
        :show="showDeleteCategoryDialog"
        @close="showDeleteCategoryDialog = false"
      >
        <form @submit.prevent="deleteCategory">
          <p class="text-2xl mb-4">Remove a category</p>

          <div>
            <select v-model="categoryToDelete">
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
            <label>Delete associated words</label>

            <button>Delete</button>
          </div>
        </form>
      </BaseDialog>
    </div>

    <WordList
      :language="language.toLowerCase()"
      :word-category="selectedCategory"
    />
  </BaseContainer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguagesStore } from '@/stores/languages';
import { useRoute, useRouter } from 'vue-router';
import WordList from '@/components/words/WordList.vue';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';

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
const categoryToDelete = ref(categoriesAvailableToDelete.value[0]); // TODO propriété pas réévaluée après ajout d'une catégorie
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
</script>
