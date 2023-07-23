import { createRouter, createWebHistory } from 'vue-router';
import PickLanguage from '@/views/PickLanguage.vue';
import SelectedLanguage from '@/views/SelectedLanguage.vue';
import WordCard from '@/views/WordCard.vue';

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
    },
    {
      path: '/:language/:wordCategory/practice',
      name: 'practiceWords',
      component: WordCard,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/',
    },
  ],
});

export default router;
