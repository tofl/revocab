import { defineStore } from 'pinia'

export const useLanguagesStore = defineStore('languages', {
    state() {
        return {
            data: {
                spanish: {
                    all: [
                        {word: 'con', translation: 'avec'},
                        {word: 'falda', translation: 'jupe'},
                    ],
                    verbs: [
                        {word: 'comer', translation: 'manger'},
                        {word: 'tener', translation: 'avoir'},
                        {word: 'ir', translation: 'aller'},
                    ],
                },
            },
        };
    },

    getters: {
        allLanguages: state => Object.keys(state.data),
        allCategories: (state) => (language) => Object.keys(state.data[language]),
    },
});
