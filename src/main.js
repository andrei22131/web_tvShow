import {createApp, markRaw} from "vue";

import App from "./App.vue";
const app = createApp(App);

import router from "./router";
app.use(router);

import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

// donner l'accès au routeur
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

app.mount("#app");
