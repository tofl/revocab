import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueGtagPlugin from 'vue-gtag';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGtagPlugin, {
    config: { id: import.meta.env.VITE_ANALYTICS_ID },
});

console.log(import.meta.env.VITE_ANALYTICS_ID);

app.mount('#app');
