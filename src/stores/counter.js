import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
    state() {
        return {
            spanish: {
                default: [
                    { word: 'con', translation: 'avec' },
                    { word: 'falda', translation: 'jupe' },
                ],
                verbs: [
                    { word: 'comer', translation: 'manger' },
                    { word: 'tener', translation: 'avoir' },
                    { word: 'ir', translation: 'aller' },
                ],
            },
        };
    },
});
