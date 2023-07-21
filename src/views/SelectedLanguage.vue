<template>
  <div class="flex">
    <h1>All words</h1>
    <button @click="startPractice">Practice</button>
    <form>
      <select v-model="selectedCategory">
        <option
          v-for="category in languages.allCategories(route.params.language)"
          :key="category"
          :value="category"
        >
          {{ displayedWordCategoryName(category) }}
        </option>
      </select>
    </form>
  </div>

  <WordList
    :language="route.params.language"
    :word-category="selectedCategory"
  />
</template>

<script setup>
import { useLanguagesStore } from '@/stores/languages';
import { useRoute, useRouter } from 'vue-router';
import {ref} from 'vue';
import WordList from '@/components/words/WordList.vue';

const router = useRouter();
const route = useRoute();

const languages = useLanguagesStore();

// Category selection
const selectedCategory = ref('all');
function displayedWordCategoryName(c) {
  return c.charAt(0).toUpperCase() + c.slice(1, c.length);
}

// Practice button
function startPractice() {
  router.push({ name: 'practiceWords', params: { wordCategory: selectedCategory.value } });
}
</script>
