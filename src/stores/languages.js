import { defineStore } from 'pinia'

export const useLanguagesStore = defineStore('languages', {
    state() {
        return {
            data: {
                spanish: {
                    all: [
                        { word: 'con', translation: 'avec' },
                        { word: 'falda', translation: 'jupe' },
                    ],
                    verbs: [
                        { word: 'comer', translation: 'manger' },
                        { word: 'tener', translation: 'avoir' },
                        { word: 'ir', translation: 'aller' },
                    ],
                },
            },
        };
    },

    getters: {
        allLanguages: (state) => {
            return (format) => {
                if (format) {
                    return Object.keys(state.data).map(el => el.charAt(0).toUpperCase() + el.slice(1, el.length));
                } else {
                    return Object.keys(state.data);
                }
            }
        },

        allCategories: state => language => Object.keys(state.data[language]),

        languageCount: state => Object.keys(state.data).length,

        /**
         * Returns the category count.
         *
         * @returns {function}
         */
        categoryCount() {
            return language => this.allCategories(language).length - 1; // The 'all' category is not counted
        },

        /**
         * Returns the word count.
         *
         * @returns {function}
         */
        wordCount() {
            return language => Object.keys(this.data[language]).reduce((accumulator, currentValue) => {
                return accumulator + this.data[language][currentValue].reduce((acc) => acc + 1, 0);
            }, 0);
        }
    },

    actions: {
        addLanguage(language) {
            if (this.data[language]) {
                return;
            }

            this.data[language] = { all: [] };
            localStorage.setItem('data', JSON.stringify(this.data));
        },

        addWord(language, category, word, translation) {
            this.data[language][category].push({ word, translation });
            localStorage.setItem('data', JSON.stringify(this.data));
        },

        addCategory(language, category) {
            this.data[language][category] = [];
            localStorage.setItem('data', JSON.stringify(this.data));
        },

        deleteCategory(language, category, deleteWords) {
            if (!deleteWords) {
                this.data[language].all = this.data[language].all.concat(this.data[language][category]);
            }

            delete this.data[language][category];
            localStorage.setItem('data', JSON.stringify(this.data));
        },
    },
});
