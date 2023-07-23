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

      <p class="mx-auto p-4 mt-28 text-right">
        <span class="hidden md:inline">Press `Space` to continue</span>
        <BaseButton
          class="md:hidden"
          @click="nextStep"
        >
          Continue
        </BaseButton>
      </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import defaultTheme from 'tailwindcss/defaultTheme';
import { useLanguagesStore } from '@/stores/languages';
import BaseButton from '@/components/ui/BaseButton.vue';

console.log(defaultTheme.screens);
console.log(window.innerWidth);

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

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    nextStep();
  } else if (e.code === 'Escape') {
    endPractice();
  }
});
</script>