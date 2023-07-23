<template>
    <div
      v-if="randomWord"
      class="h-screen flex flex-col justify-between"
      @keydown="nextStep"
    >
      <p
        class="p-4"
        @click="endPractice"
      >
        <span class="cursor-pointer">Close</span>
      </p>

      <div class="text-center">
        <p class="text-7xl md:text-9xl mb-7">{{ randomWord.word }}</p>
        <p
          class="text-4xl md:text-6xl text-main-blue"
          :class="{'blur-md': hideTranslation}"
        >
          {{ randomWord.translation }}
        </p>
      </div>

      <p class="p-4 mt-28 text-right">Press `Space` to continue</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLanguagesStore } from '@/stores/languages';

const languagesStore = useLanguagesStore();
const route = useRoute();
const router = useRouter();

const randomWord = ref(null);
randomWord.value = languagesStore.randomWord(route.params.language, route.params.wordCategory);

function endPractice() {
  router.push({ name: 'language' });
}

if (!randomWord.value) {
  endPractice();
}

// 1 => Word not show yet
// 2 => User is invited to print the next word
const step = ref(1);
const hideTranslation = ref(true);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    nextStep();
  } else if (e.code === 'Escape') {
    endPractice();
  }
});
function nextStep() {
  if (step.value === 1) {
    hideTranslation.value = false;
    step.value = 2;
  } else {
    hideTranslation.value = true;
    randomWord.value = languagesStore.randomWord(route.params.language, route.params.wordCategory);
    step.value = 1;
  }
}
</script>