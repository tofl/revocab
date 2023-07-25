<template>
    <table
      v-if="words.length > 0"
      class="text-2xl text-center w-full"
    >
      <tr class="sticky top-0 text-main-dark bg-main-green">
        <th class="border-b p-3">Word</th>
        <th class="border-b p-3">Meaning</th>
      </tr>

      <tr
        v-for="word in words"
        :key="word.word"
        @mouseover="hoveredWord = word.id"
        @mouseleave="hoveredWord = ''"
      >
        <td class="border p-3">{{ word.word }}</td>
        <td class="border p-3">
          {{ word.translation }}
          <span
            class="absolute right-2 text-lg cursor-pointer"
            v-show="hoveredWord === word.id"
            @click="deleteWord(word.id)"
          >
            Delete
          </span>
        </td>
      </tr>
    </table>

  <p
    v-else
    class="text-center text-2xl mt-8"
  >
    There are no words
  </p>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useLanguagesStore } from '@/stores/languages';

const props = defineProps({
  language: {
    type: String,
    required: true,
  },
  wordCategory: {
    type: String,
    required: true,
  },
});

const languagesStore = useLanguagesStore();
const words = computed(() => {
  if (props.wordCategory === 'all') {
    return languagesStore.allWords(props.language);
  } else {
    return languagesStore.wordsFromCategory(props.language, props.wordCategory);
  }
});

const hoveredWord = ref('');

function deleteWord(wordId) {
  languagesStore.deleteWord(props.language, wordId);
}
</script>