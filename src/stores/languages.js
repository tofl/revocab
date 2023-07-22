import { defineStore } from 'pinia'

const firstLetterToUppercase = w => w.charAt(0).toUpperCase() + w.slice(1, w.length).toLowerCase();

export const useLanguagesStore = defineStore('languages', {
    state() {
        return {
            data: {},
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

        allWords: (state) => {
            return (language) => {
                const words = [];
                Object.keys(state.data[language]).forEach((k) => {
                        return state.data[language][k].forEach((el) => {
                                words.push({
                                    id: el.id,
                                    word: firstLetterToUppercase(el.word),
                                    translation: firstLetterToUppercase(el.translation)
                                });
                            }
                        );
                    },
                );
                return words;
            };
        },

        wordsFromCategory: (state) => (language, category) => {
            return state.data[language][category].map((w) => {
                return { id: w.id, word: firstLetterToUppercase(w.word), translation: firstLetterToUppercase(w.translation) };
            })
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
            const id = `${this.wordCount(language)}${Math.floor(Math.random() * 100000)}`;
            this.data[language][category].push({ id, word, translation });
            localStorage.setItem('data', JSON.stringify(this.data));
        },

        deleteWord(language, wordId) {
            Object.keys(this.data[language]).forEach((key) => {
                this.data[language][key] = this.data[language][key].filter((w) => w.id !== wordId);
            });
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
