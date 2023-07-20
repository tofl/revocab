import { createRouter, createWebHistory } from 'vue-router';
import PickLanguage from '@/views/PickLanguage.vue';
import SelectedLanguage from '@/views/SelectedLanguage.vue';
import FilteredWords from '@/views/FilteredWords.vue';
import WordCard from '@/views/WordCard.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pickLanguage',
      component: PickLanguage,
    },
    {
      path: '/:language',
      name: 'language',
      component: SelectedLanguage,
      redirect: to => `/${to.params.language}/all`,
      children: [
        {
          path: '/:language/:wordCategory',
          name: 'wordCategory',
          component: FilteredWords,
        },
      ],
    },
    {
      path: '/:language/:wordCategory/practice',
      name: 'practiceWords',
      component: WordCard,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    },
  ],
});

export default router;
